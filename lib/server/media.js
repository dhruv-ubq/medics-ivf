import "server-only";
import { Readable } from "node:stream";
import { ObjectId } from "mongodb";
import { getBucket } from "./db";

export const ALLOWED = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/svg+xml": "svg", "image/gif": "gif", "video/mp4": "mp4", "video/webm": "webm" };
export const MAX_BYTES = 5 * 1024 * 1024;
export const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

function sniff(buf, declared) {
  const h = buf.subarray(0, 12);
  if (h[0] === 0x89 && h[1] === 0x50) return "image/png";
  if (h[0] === 0xff && h[1] === 0xd8) return "image/jpeg";
  if (h.toString("ascii", 0, 4) === "RIFF" && h.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  if (h.toString("ascii", 0, 3) === "GIF") return "image/gif";
  if (h.toString("ascii", 4, 8) === "ftyp") return "video/mp4";
  if (h[0] === 0x1a && h[1] === 0x45 && h[2] === 0xdf && h[3] === 0xa3) return "video/webm";
  const head = buf.subarray(0, 1024).toString("utf8").toLowerCase();
  if (declared === "image/svg+xml" && head.includes("<svg")) return "image/svg+xml";
  return null;
}

export async function saveMedia(file, user) {
  if (file.size > MAX_VIDEO_BYTES) throw Object.assign(new Error("Files must be under 100 MB"), { status: 413 });
  const buf = Buffer.from(await file.arrayBuffer());
  const type = sniff(buf, file.type);
  if (!type || !ALLOWED[type]) throw Object.assign(new Error("Only PNG, JPG, WebP, GIF, SVG images or MP4, WebM videos are allowed"), { status: 415 });
  const isVideo = type.startsWith("video/");
  if (!isVideo && buf.length > MAX_BYTES) throw Object.assign(new Error("Images must be under 5 MB"), { status: 413 });
  const bucket = await getBucket();
  const name = (file.name || (isVideo ? "video" : "image")).replace(/[^\w.\-]+/g, "_").slice(0, 80);
  const up = bucket.openUploadStream(name, { metadata: { contentType: type, uploadedBy: user.email, uploadedAt: new Date(), size: buf.length } });
  await new Promise((res, rej) => Readable.from(buf).pipe(up).on("finish", res).on("error", rej));
  return { id: String(up.id), url: `/api/media/${up.id}`, type, size: buf.length };
}

// Returns file info plus a stream for the whole file or a byte range (needed for video seeking on Safari and iOS).
export async function openMedia(id, range) {
  if (!ObjectId.isValid(id)) return null;
  const bucket = await getBucket();
  const _id = new ObjectId(id);
  const [f] = await bucket.find({ _id }).toArray();
  if (!f) return null;
  const size = f.length, type = f.metadata?.contentType || "application/octet-stream";
  let start = 0, end = size - 1, partial = false;
  const m = range && /^bytes=(\d*)-(\d*)$/.exec(range.trim());
  if (m && (m[1] || m[2])) {
    if (m[1]) { start = Number(m[1]); end = m[2] ? Math.min(Number(m[2]), size - 1) : size - 1; }
    else { start = Math.max(0, size - Number(m[2])); }
    if (start > end || start >= size) return { size, type, invalidRange: true };
    partial = true;
  }
  const stream = bucket.openDownloadStream(_id, { start, end: end + 1 });
  return { size, type, start, end, partial, stream: Readable.toWeb(stream), etag: `"${id}"` };
}

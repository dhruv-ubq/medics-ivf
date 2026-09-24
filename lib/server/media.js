import "server-only";
import { Readable } from "node:stream";
import { ObjectId } from "mongodb";
import { getBucket } from "./db";

export const ALLOWED = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/svg+xml": "svg", "image/gif": "gif" };
export const MAX_BYTES = 5 * 1024 * 1024;

function sniff(buf, declared) {
  const h = buf.subarray(0, 12);
  if (h[0] === 0x89 && h[1] === 0x50) return "image/png";
  if (h[0] === 0xff && h[1] === 0xd8) return "image/jpeg";
  if (h.toString("ascii", 0, 4) === "RIFF" && h.toString("ascii", 8, 12) === "WEBP") return "image/webp";
  if (h.toString("ascii", 0, 3) === "GIF") return "image/gif";
  const head = buf.subarray(0, 1024).toString("utf8").toLowerCase();
  if (declared === "image/svg+xml" && head.includes("<svg")) return "image/svg+xml";
  return null;
}

export async function saveMedia(file, user) {
  const buf = Buffer.from(await file.arrayBuffer());
  if (buf.length > MAX_BYTES) throw Object.assign(new Error("Images must be under 5 MB"), { status: 413 });
  const type = sniff(buf, file.type);
  if (!type || !ALLOWED[type]) throw Object.assign(new Error("Only PNG, JPG, WebP, GIF or SVG images are allowed"), { status: 415 });
  const bucket = await getBucket();
  const name = (file.name || "image").replace(/[^\w.\-]+/g, "_").slice(0, 80);
  const up = bucket.openUploadStream(name, { metadata: { contentType: type, uploadedBy: user.email, uploadedAt: new Date(), size: buf.length } });
  await new Promise((res, rej) => Readable.from(buf).pipe(up).on("finish", res).on("error", rej));
  return { id: String(up.id), url: `/api/media/${up.id}`, type, size: buf.length };
}

export async function readMedia(id) {
  if (!ObjectId.isValid(id)) return null;
  const bucket = await getBucket();
  const _id = new ObjectId(id);
  const [f] = await bucket.find({ _id }).toArray();
  if (!f) return null;
  const chunks = [];
  for await (const c of bucket.openDownloadStream(_id)) chunks.push(c);
  return { buf: Buffer.concat(chunks), type: f.metadata?.contentType || "application/octet-stream", etag: `"${id}"` };
}

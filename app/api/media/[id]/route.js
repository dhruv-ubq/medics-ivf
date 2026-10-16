export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { openMedia } from "@/lib/server/media";
export async function GET(req, { params }) {
  try {
    if (req.headers.get("if-none-match") === `"${params.id}"` && !req.headers.get("range")) return new Response(null, { status: 304 });
    const m = await openMedia(params.id, req.headers.get("range"));
    if (!m) return new Response("Not found", { status: 404 });
    if (m.invalidRange) return new Response(null, { status: 416, headers: { "Content-Range": `bytes */${m.size}` } });
    const headers = {
      "Content-Type": m.type, "Content-Length": String(m.end - m.start + 1), ETag: m.etag, "Accept-Ranges": "bytes",
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    };
    if (m.partial) headers["Content-Range"] = `bytes ${m.start}-${m.end}/${m.size}`;
    return new Response(m.stream, { status: m.partial ? 206 : 200, headers });
  } catch (e) { console.error("[media]", e); return new Response("Unavailable", { status: 503 }); }
}

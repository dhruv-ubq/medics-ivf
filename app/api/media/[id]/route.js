export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { readMedia } from "@/lib/server/media";
export async function GET(req, { params }) {
  try {
    const m = await readMedia(params.id);
    if (!m) return new Response("Not found", { status: 404 });
    if (req.headers.get("if-none-match") === m.etag) return new Response(null, { status: 304 });
    return new Response(m.buf, { headers: {
      "Content-Type": m.type, "Content-Length": String(m.buf.length), ETag: m.etag,
      "Cache-Control": "public, max-age=31536000, immutable",
      "X-Content-Type-Options": "nosniff",
      "Content-Security-Policy": "default-src 'none'; style-src 'unsafe-inline'; sandbox",
    } });
  } catch (e) { console.error("[media]", e); return new Response("Unavailable", { status: 503 }); }
}

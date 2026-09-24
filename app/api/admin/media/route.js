export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json, fail } from "@/lib/server/http";
import { saveMedia } from "@/lib/server/media";
export const POST = adminRoute("media:upload", async (req, ctx, s) => {
  const form = await req.formData().catch(() => null);
  const file = form?.get("file");
  if (!file || typeof file === "string") return fail(400, "No file received");
  try { return json(await saveMedia(file, s.user), 201); }
  catch (e) { return fail(e.status || 500, e.status ? e.message : "Upload failed"); }
});

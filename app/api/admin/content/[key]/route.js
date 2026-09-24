export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json, fail } from "@/lib/server/http";
import { saveDraft } from "@/lib/server/content";
import { validateSection } from "@/lib/server/schemas";
export const PUT = adminRoute("content:write", async (req, { params }, s) => {
  let body; try { body = await req.json(); } catch { return fail(400, "Invalid request"); }
  const v = validateSection(params.key, body.data);
  if (!v.ok) return fail(422, v.error);
  await saveDraft(params.key, v.data, s.user);
  return json({ ok: true, savedAt: new Date().toISOString() });
});

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json, fail } from "@/lib/server/http";
import { restoreVersion } from "@/lib/server/content";
export const POST = adminRoute("content:write", async (req, { params }, s) => {
  const { version } = await req.json().catch(() => ({}));
  if (!(await restoreVersion(params.key, version, s.user))) return fail(404, "Version not found");
  return json({ ok: true });
});

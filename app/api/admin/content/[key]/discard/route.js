export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json, fail } from "@/lib/server/http";
import { discardDraft } from "@/lib/server/content";
import { SECTION_KEYS } from "@/lib/defaults";
export const POST = adminRoute("content:write", async (req, { params }, s) => {
  if (!SECTION_KEYS.includes(params.key)) return fail(404, "Unknown section");
  await discardDraft(params.key, s.user); return json({ ok: true });
});

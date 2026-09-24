export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json, fail } from "@/lib/server/http";
import { publish } from "@/lib/server/content";
export const POST = adminRoute("content:publish", async (req, ctx, s) => {
  const { keys, note } = await req.json().catch(() => ({}));
  if (!Array.isArray(keys) || !keys.length) return fail(400, "Choose what to publish");
  const done = await publish(keys, s.user, note);
  return json({ ok: true, published: done });
});

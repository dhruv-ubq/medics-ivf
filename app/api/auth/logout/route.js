export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { draftMode } from "next/headers";
import { destroySession } from "@/lib/server/auth";
import { json, fail, sameOrigin } from "@/lib/server/http";
export async function POST(req) {
  if (!sameOrigin(req)) return fail(403, "Bad origin");
  await destroySession(); draftMode().disable();
  return json({ ok: true });
}

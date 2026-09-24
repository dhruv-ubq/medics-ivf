export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/server/auth";
// Turns draft preview on or off for the signed in admin, then sends them to the page.
export async function GET(req) {
  const u = new URL(req.url);
  const to = (u.searchParams.get("to") || "/").startsWith("/") ? u.searchParams.get("to") || "/" : "/";
  if (u.searchParams.get("on") === "0") { draftMode().disable(); redirect(to); }
  const s = await getSession().catch(() => null);
  if (!s) redirect("/admin/login?next=" + encodeURIComponent("/api/admin/preview?to=" + to));
  draftMode().enable(); redirect(to);
}

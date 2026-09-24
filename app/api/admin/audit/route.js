export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json } from "@/lib/server/http";
import { recentAudit } from "@/lib/server/content";
export const GET = adminRoute("content:read", async () => json({ entries: await recentAudit() }));

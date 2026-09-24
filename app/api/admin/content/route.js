export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json } from "@/lib/server/http";
import { getAdminState } from "@/lib/server/content";
export const GET = adminRoute("content:read", async (req, ctx, s) => json({ sections: await getAdminState(), user: s.user, permissions: s.permissions }));

export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { adminRoute, json } from "@/lib/server/http";
import { listVersions } from "@/lib/server/content";
export const GET = adminRoute("content:read", async (req, { params }) => json({ versions: await listVersions(params.key) }));

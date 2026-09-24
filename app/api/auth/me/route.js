export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { getSession } from "@/lib/server/auth";
import { json } from "@/lib/server/http";
export async function GET() { const s = await getSession().catch(() => null); return json(s ? { user: s.user, permissions: s.permissions } : { user: null }, s ? 200 : 401); }

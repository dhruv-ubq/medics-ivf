export const dynamic = "force-dynamic";
export const runtime = "nodejs";
import { verifyLogin, createSession } from "@/lib/server/auth";
import { json, fail, sameOrigin } from "@/lib/server/http";

export async function POST(req) {
  if (!sameOrigin(req)) return fail(403, "Bad origin");
  let body; try { body = await req.json(); } catch { return fail(400, "Invalid request"); }
  const email = String(body.email || "").slice(0, 200), password = String(body.password || "").slice(0, 200);
  if (!email || !password) return fail(400, "Enter your email and password");
  try {
    const r = await verifyLogin(email, password);
    if (r.locked) return fail(429, "Too many attempts. Try again in 15 minutes.");
    if (!r.ok) return fail(401, "Email or password is incorrect");
    await createSession(r.user, { ip: req.headers.get("x-forwarded-for") || "", ua: req.headers.get("user-agent") || "" });
    return json({ ok: true, user: { email: r.user.email, name: r.user.name, role: r.user.role } });
  } catch (e) { console.error("[login]", e); return fail(503, "Sign in is unavailable. Check the database connection."); }
}

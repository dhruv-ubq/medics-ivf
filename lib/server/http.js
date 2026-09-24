import "server-only";
import { NextResponse } from "next/server";
import { getSession } from "./auth";

export const json = (data, status = 200) => NextResponse.json(data, { status, headers: { "Cache-Control": "no-store" } });
export const fail = (status, error) => json({ error }, status);

// CSRF defence for state changing requests: the Origin must match this host.
export function sameOrigin(req) {
  const origin = req.headers.get("origin");
  if (!origin) return req.method === "GET";
  try { return new URL(origin).host === req.headers.get("host"); } catch { return false; }
}

// Wrap an admin route: checks origin, session and permission.
export function adminRoute(permission, handler) {
  return async (req, ctx) => {
    try {
      if (req.method !== "GET" && !sameOrigin(req)) return fail(403, "Bad origin");
      const session = await getSession();
      if (!session) return fail(401, "Please sign in");
      if (permission && !session.permissions.includes(permission)) return fail(403, "You do not have permission for this");
      return await handler(req, ctx, session);
    } catch (e) {
      console.error("[admin api]", e);
      return fail(500, "Something went wrong. Please try again.");
    }
  };
}

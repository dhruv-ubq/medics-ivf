import { NextResponse } from "next/server";

// First line of defence: no session cookie, no admin. Every admin API also verifies the session in the database.
export function middleware(req) {
  const { pathname, search } = req.nextUrl;
  if (pathname === "/admin/login") return NextResponse.next();
  if (req.cookies.get("miv_session")) return NextResponse.next();
  if (pathname.startsWith("/api/admin")) return NextResponse.json({ error: "Please sign in" }, { status: 401 });
  const url = req.nextUrl.clone(); url.pathname = "/admin/login"; url.search = "?next=" + encodeURIComponent(pathname + search);
  return NextResponse.redirect(url);
}
export const config = { matcher: ["/admin/:path*", "/api/admin/:path*"] };

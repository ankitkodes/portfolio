import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect /admin/* routes (except login-related)
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // Allow the login page itself
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Check session cookie
  const sessionCookie = request.cookies.get("admin_session");
  const secret = process.env.SESSION_SECRET || "fallback-secret";
  const expectedToken = btoa(secret + "-admin-authenticated");

  if (!sessionCookie || sessionCookie.value !== expectedToken) {
    // Redirect to portfolio homepage if not authenticated
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

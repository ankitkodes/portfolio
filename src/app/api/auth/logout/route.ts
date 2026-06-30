import { NextResponse } from "next/server";
import { getLogoutCookie } from "@/lib/auth";

export async function POST() {
  const cookie = getLogoutCookie();
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookie.name, cookie.value, {
    maxAge: cookie.maxAge,
    path: cookie.path,
  });
  return response;
}

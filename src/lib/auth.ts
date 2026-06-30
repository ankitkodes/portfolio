import { cookies } from "next/headers";

const COOKIE_NAME = "admin_session";
const SESSION_MAX_AGE = 8 * 60 * 60; // 8 hours in seconds

function getSessionToken(): string {
  const secret = process.env.SESSION_SECRET || "fallback-secret";
  return btoa(secret + "-admin-authenticated");
}

export async function verifySession(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME);
  if (!session) return false;
  return session.value === getSessionToken();
}

export function getSessionCookie() {
  return {
    name: COOKIE_NAME,
    value: getSessionToken(),
    maxAge: SESSION_MAX_AGE,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
  };
}

export function getLogoutCookie() {
  return {
    name: COOKIE_NAME,
    value: "",
    maxAge: 0,
    path: "/",
  };
}

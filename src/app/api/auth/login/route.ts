import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { passcode } = await req.json();
  const adminPasscode = process.env.ADMIN_PASSCODE;

  if (!adminPasscode) {
    console.error("[Auth] ADMIN_PASSCODE not set in env");
    return NextResponse.json({ error: "Server config error" }, { status: 500 });
  }

  if (passcode !== adminPasscode) {
    console.log(`[Auth] Failed login attempt at ${new Date().toISOString()}`);
    return NextResponse.json({ error: "Invalid passcode" }, { status: 401 });
  }

  // Import dynamically to avoid edge issues
  const { getSessionCookie } = await import("@/lib/auth");
  const cookie = getSessionCookie();

  // Update lastLogin timestamp on profile
  try {
    const prisma = (await import("@/lib/db")).default;
    const profile = await prisma.profile.findFirst();
    if (profile) {
      await prisma.profile.update({
        where: { id: profile.id },
        data: { lastLogin: new Date() },
      });
    }
  } catch (err) {
    console.error("Failed to update lastLogin:", err);
  }
  
  const response = NextResponse.json({ success: true });
  response.cookies.set(cookie.name, cookie.value, {
    maxAge: cookie.maxAge,
    httpOnly: cookie.httpOnly,
    secure: cookie.secure,
    sameSite: cookie.sameSite,
    path: cookie.path,
  });

  return response;
}

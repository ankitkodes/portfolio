import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await prisma.profile.findFirst();
    return NextResponse.json(data || {});
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    
    const existing = await prisma.profile.findFirst();
    let profile;
    
    if (existing) {
      profile = await prisma.profile.update({
        where: { id: existing.id },
        data: {
          name: data.name,
          tagline: data.tagline,
          bio: data.bio,
          profileImage: data.profileImage,
          resumeUrl: data.resumeUrl,
          email: data.email,
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
        }
      });
    } else {
      profile = await prisma.profile.create({
        data: {
          name: data.name,
          tagline: data.tagline,
          bio: data.bio,
          profileImage: data.profileImage,
          resumeUrl: data.resumeUrl,
          email: data.email,
          github: data.github,
          linkedin: data.linkedin,
          twitter: data.twitter,
        }
      });
    }
    
    return NextResponse.json(profile);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save profile" }, { status: 500 });
  }
}

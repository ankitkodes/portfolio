import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const posts = await prisma.blogPost.findMany({
      where: { status: "published" },
      orderBy: [
        { featured: "desc" },
        { publishedAt: "desc" }
      ],
    });
    return NextResponse.json(posts, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return NextResponse.json([], { status: 500 });
  }
}

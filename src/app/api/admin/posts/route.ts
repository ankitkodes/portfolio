import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { slugify, calculateReadTime } from "@/lib/utils";
import { verifySession } from "@/lib/auth";

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const posts = await prisma.blogPost.findMany({ orderBy: { updatedAt: "desc" } });
    return NextResponse.json(posts);
  } catch { return NextResponse.json([], { status: 500 }); }
}

export async function POST(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const body = await req.json();
    const slug = slugify(body.title);
    const readTime = calculateReadTime(body.content);

    if (body.featured) {
      await prisma.blogPost.updateMany({ data: { featured: false } });
    }

    const post = await prisma.blogPost.create({
      data: {
        title: body.title, slug, excerpt: body.excerpt || "", content: body.content || {},
        coverImage: body.coverImage || "", tags: body.tags || [], status: body.status || "draft",
        featured: body.featured || false,
        publishedAt: body.status === "published" ? new Date() : null, readTime: `${readTime} min read`,
      },
    });

    const { logActivity } = await import("@/lib/activity");
    await logActivity(post.status === "published" ? "publish" : "create", "post", post.title);

    return NextResponse.json(post);
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 });
  }
}

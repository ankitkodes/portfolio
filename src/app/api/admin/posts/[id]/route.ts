import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { slugify, calculateReadTime } from "@/lib/utils";
import { verifySession } from "@/lib/auth";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (!post) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json(post);
  } catch { return NextResponse.json({ error: "Server error" }, { status: 500 }); }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const body = await req.json();
    const readTime = calculateReadTime(body.content);

    if (body.featured) {
      await prisma.blogPost.updateMany({
        where: { id: { not: id } },
        data: { featured: false },
      });
    }

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title: body.title, slug: slugify(body.title), excerpt: body.excerpt || "",
        content: body.content || {}, coverImage: body.coverImage || "", tags: body.tags || [],
        status: body.status || "draft", readTime: `${readTime} min read`,
        featured: body.featured || false,
        publishedAt: body.status === "published" ? new Date() : null,
      },
    });

    const { logActivity } = await import("@/lib/activity");
    await logActivity(body.status === "published" ? "publish" : "update", "post", post.title);

    return NextResponse.json(post);
  } catch (e) { return NextResponse.json({ error: String(e) }, { status: 500 }); }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const post = await prisma.blogPost.findUnique({ where: { id } });
    if (post) {
      await prisma.blogPost.delete({ where: { id } });
      const { logActivity } = await import("@/lib/activity");
      await logActivity("delete", "post", post.title);
    }
    return NextResponse.json({ success: true });
  } catch { return NextResponse.json({ error: "Failed" }, { status: 500 }); }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const data = await req.json();
    
    // Auto-generate slug if missing
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const project = await prisma.project.update({
      where: { id },
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription,
        techStack: data.techStack,
        liveUrl: data.liveUrl,
        githubUrl: data.githubUrl,
        coverImage: data.coverImage,
        featured: data.featured,
        status: data.status,
      }
    });

    const { logActivity } = await import("@/lib/activity");
    await logActivity("update", "project", project.title);

    return NextResponse.json(project);
  } catch (error: any) {
    if (error?.code === 'P2002') return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const project = await prisma.project.findUnique({ where: { id } });
    if (project) {
      await prisma.project.delete({
        where: { id }
      });
      const { logActivity } = await import("@/lib/activity");
      await logActivity("delete", "project", project.title);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    
    // Auto-generate slug if missing
    if (!data.slug && data.title) {
      data.slug = data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }

    const project = await prisma.project.create({
      data: {
        title: data.title,
        slug: data.slug,
        description: data.description,
        longDescription: data.longDescription || null,
        techStack: data.techStack || [],
        liveUrl: data.liveUrl || null,
        githubUrl: data.githubUrl || null,
        coverImage: data.coverImage || null,
        featured: data.featured || false,
        status: data.status || "active",
        order: data.order || 0,
      }
    });
    return NextResponse.json(project);
  } catch (error: any) {
    if (error?.code === 'P2002') return NextResponse.json({ error: "Slug must be unique" }, { status: 400 });
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}

// Bulk update (reorder)
export async function PUT(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json(); // Expected: [{ id: "cuid", order: 0 }, { id: "cuid2", order: 1 }]
    if (!Array.isArray(data)) return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    
    // Use transaction for bulk update
    await prisma.$transaction(
      data.map((item) => 
        prisma.project.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder projects" }, { status: 500 });
  }
}

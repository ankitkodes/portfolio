import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const data = await req.json();
    const skill = await prisma.skill.update({
      where: { id },
      data: {
        name: data.name,
        category: data.category,
        proficiency: data.proficiency,
        icon: data.icon,
      }
    });
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update skill" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    await prisma.skill.delete({
      where: { id }
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete skill" }, { status: 500 });
  }
}

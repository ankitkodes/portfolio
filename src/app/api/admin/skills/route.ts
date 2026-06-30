import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await prisma.skill.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch skills" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        category: data.category || "Other",
        proficiency: data.proficiency || 3,
        icon: data.icon || null,
        order: data.order || 0,
      }
    });
    return NextResponse.json(skill);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create skill" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    if (!Array.isArray(data)) return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    await prisma.$transaction(
      data.map((item) => 
        prisma.skill.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder skills" }, { status: 500 });
  }
}

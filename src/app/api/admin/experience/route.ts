import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function GET() {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await prisma.experience.findMany({
      orderBy: { order: "asc" },
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch experience" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    const exp = await prisma.experience.create({
      data: {
        company: data.company,
        role: data.role,
        startDate: data.startDate,
        endDate: data.endDate || null,
        current: data.current || false,
        description: data.description || [],
        techUsed: data.techUsed || [],
        logo: data.logo || null,
        order: data.order || 0,
      }
    });
    return NextResponse.json(exp);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create experience" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  try {
    const data = await req.json();
    if (!Array.isArray(data)) return NextResponse.json({ error: "Invalid data format" }, { status: 400 });
    await prisma.$transaction(
      data.map((item) => 
        prisma.experience.update({
          where: { id: item.id },
          data: { order: item.order }
        })
      )
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to reorder experience" }, { status: 500 });
  }
}

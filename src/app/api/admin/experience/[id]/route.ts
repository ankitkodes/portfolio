import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { verifySession } from "@/lib/auth";

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const data = await req.json();
    const exp = await prisma.experience.update({
      where: { id },
      data: {
        company: data.company,
        role: data.role,
        startDate: data.startDate,
        endDate: data.endDate,
        current: data.current,
        description: data.description,
        techUsed: data.techUsed,
        logo: data.logo,
      }
    });

    const { logActivity } = await import("@/lib/activity");
    await logActivity("update", "experience", `${exp.role} at ${exp.company}`);

    return NextResponse.json(exp);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update experience" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!(await verifySession())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await params;
  try {
    const exp = await prisma.experience.findUnique({ where: { id } });
    if (exp) {
      await prisma.experience.delete({
        where: { id }
      });
      const { logActivity } = await import("@/lib/activity");
      await logActivity("delete", "experience", `${exp.role} at ${exp.company}`);
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete experience" }, { status: 500 });
  }
}

import { prisma } from "@/app/db/db";
import { NextResponse } from "next/server";

export async function GET(res, { params }) {
  const { id } = params;
  const teacher = await prisma.teacher.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
  });
  if (!teacher)
    return NextResponse.json({ error: "Teacher not found" }, { status: 404 });

  return NextResponse.json(teacher);
}

import { prisma } from "@/app/db/db";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  const { searchParams } = new URL(req.url);
  const { id } = params;

  const getTeacher = searchParams.get("getTeacher");

  const student = await prisma.student.findFirst({
    where: {
      id: {
        equals: Number(id),
      },
    },
    include: {
      teacher: getTeacher === "true" ? true : false,
    },
  });
  if (!student)
    return NextResponse.json({ error: "Student not found" }, { status: 404 });
  return NextResponse.json(student);
}

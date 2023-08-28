import { prisma } from "@/app/db/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().min(5).max(16),
  gender: z.enum(["m", "f"]),
  email: z.string().email().min(5),
});

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

export async function PUT(req, { params }) {
  const { id } = params;
  const requestBody = await req.json();

  try {
    const validatedNewData = studentSchema.parse(requestBody);
    const student = await prisma.student.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    });
    if (!student)
      return NextResponse.json({ error: "Student not found" }, { status: 404 });

    const updatedStudent = await prisma.student.update({
      where: { id: Number(id) },
      data: validatedNewData,
    });

    return NextResponse.json(updatedStudent);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors = error?.format();
      return NextResponse.json(
        { errors },
        {
          status: 400,
        }
      );
    } else {
      console.log(error);
      return NextResponse.json(error?.meta, {
        status: 400,
      });
    }
  }
}

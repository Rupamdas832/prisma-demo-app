import { prisma } from "@/app/db/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const teacherSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().min(21).max(60),
  gender: z.enum(["m", "f"]),
  email: z.string().email().min(5),
});

export async function GET(res, { params }) {
  const { id } = params;
  try {
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
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  const { id } = params;
  const requestBody = await req.json();

  try {
    const validatedNewData = teacherSchema.parse(requestBody);
    const teacher = await prisma.teacher.findFirst({
      where: {
        id: {
          equals: Number(id),
        },
      },
    });
    if (!teacher)
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });

    const updatedTeacher = await prisma.teacher.update({
      where: { id: Number(id) },
      data: validatedNewData,
    });

    return NextResponse.json(updatedTeacher);
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

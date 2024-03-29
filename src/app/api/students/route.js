import { NextResponse } from "next/server";
import { prisma } from "../../db/db";
import { z } from "zod";
import { hash } from "@/utils/hash";

const studentSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().min(5).max(16),
  gender: z.enum(["m", "f"]),
  email: z.string().email().min(5),
  teacherId: z.number(),
  password: z.string(),
});

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const teacherId = searchParams.get("teacherId");

  let students;
  if (Number(teacherId)) {
    students = await prisma.student.findMany({
      where: {
        teacherId: {
          equals: Number(teacherId),
        },
      },
    });
  } else {
    students = await prisma.student.findMany();
  }
  return NextResponse.json(students);
}

export async function POST(req, res) {
  const requestBody = await req.json();

  try {
    const validatedNewData = studentSchema.parse(requestBody);
    const passwordHash = await hash(validatedNewData.password);

    const newStudent = await prisma.student.create({
      data: {
        ...validatedNewData,
        password: passwordHash,
      },
    });

    return NextResponse.json(newStudent);
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

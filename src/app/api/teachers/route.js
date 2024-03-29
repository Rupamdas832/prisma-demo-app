import { NextResponse } from "next/server";
import { prisma } from "../../db/db";
import { z } from "zod";
import { cookies } from "next/headers";
import { verify } from "@/utils/jwt";
import { hash } from "@/utils/hash";

const teacherSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number().min(21).max(60),
  gender: z.enum(["m", "f"]),
  email: z.string().email().min(5),
  password: z.string().min(6),
});

export async function GET() {
  const teachers = await prisma.teacher.findMany();
  return NextResponse.json(teachers);
}

export async function POST(req, res) {
  const requestBody = await req.json();

  try {
    const validatedNewData = teacherSchema.parse(requestBody);
    const passwordHash = await hash(validatedNewData.password);

    const newTeacher = await prisma.teacher.create({
      data: {
        ...validatedNewData,
        password: passwordHash,
      },
    });

    return NextResponse.json(newTeacher);
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

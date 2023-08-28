import { prisma } from "@/app/db/db";
import { compare } from "@/utils/hash";
import { sign } from "@/utils/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  const requestedStudent = await prisma.student.findFirst({
    where: {
      email: {
        equals: email,
      },
    },
  });

  if (requestedStudent) {
    const isValidPassword = await compare(password, requestedStudent.password);

    if (isValidPassword === true) {
      const token = await sign({
        accessLevel: "student",
        email: requestedStudent.email,
        studentId: requestedStudent.id,
      });
      const oneHour = 60 * 60 * 1000;

      cookies().set({
        name: "token",
        value: token,
        httpOnly: true,
        expires: Date.now() + oneHour,
      });

      return NextResponse.json(
        {
          email: requestedStudent.email,
          id: requestedStudent.id,
        },
        { status: 200 }
      );
    }
  }

  return NextResponse.json(
    {
      error: "invalid credentials",
    },
    { status: 400 }
  );
}

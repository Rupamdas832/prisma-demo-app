import { prisma } from "@/app/db/db";
import { compare } from "@/utils/hash";
import { sign } from "@/utils/jwt";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(req) {
  const { email, password } = await req.json();

  try {
    const requestedTeacher = await prisma.teacher.findFirst({
      where: {
        email: {
          equals: email,
        },
      },
    });
    if (requestedTeacher) {
      const isValidPassword = await compare(
        password,
        requestedTeacher.password
      );

      if (isValidPassword === true) {
        const token = await sign({
          accessLevel: "teacher",
          email: requestedTeacher.email,
          teacherId: requestedTeacher.id,
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
            email: requestedTeacher.email,
            id: requestedTeacher.id,
          },
          { status: 200 }
        );
      }
    }
    return NextResponse.json(
      {
        error: "Invalid credentials",
      },
      { status: 400 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Something went wrong",
      },
      { status: 500 }
    );
  }
}

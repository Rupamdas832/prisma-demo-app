import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req) {
  cookies().delete("token");

  return NextResponse.json(
    {
      message: "User Logged Out",
    },
    { status: 200 }
  );
}

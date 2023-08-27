import { NextResponse } from "next/server";
import { verify } from "./utils/jwt";

const adminAccessLevel = async (req) => {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }
  console.log({ token });
  const jwt = await verify(token.value);
  console.log({ jwt });
  if (!jwt || jwt.payload.accessLevel !== "admin") {
    return false;
  }
  return true;
};

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/teachers") ||
    req.nextUrl.pathname.startsWith("/api/teachers")
  ) {
    if (!(await adminAccessLevel(req)))
      return NextResponse.redirect(new URL("/admin/login", req.url));
  }
}

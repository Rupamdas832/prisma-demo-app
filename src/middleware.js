import { NextResponse } from "next/server";
import { verify } from "./utils/jwt";

const adminAccessLevel = async (req) => {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }
  const jwt = await verify(token.value);
  if (!jwt || jwt.payload.accessLevel !== "admin") {
    return false;
  }
  return true;
};

const teacherAccessLevel = async (req) => {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }
  const jwt = await verify(token.value);
  if (
    jwt &&
    (jwt.payload.accessLevel === "teacher" ||
      jwt.payload.accessLevel === "admin")
  ) {
    return true;
  }
  return false;
};

const teacherAccessJwt = async (req) => {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }
  const jwt = await verify(token.value);

  return jwt;
};

const studentAccessLevel = async (req) => {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }
  const jwt = await verify(token.value);
  if (
    jwt &&
    (jwt.payload.accessLevel === "student" ||
      jwt.payload.accessLevel === "admin")
  ) {
    return true;
  }
  return false;
};

const PATTERNS = [
  [
    new URLPattern({ pathname: "/teachers/[id]/edit" }),
    ({ pathname }) => pathname.groups,
  ],
];

const params = (url) => {
  const input = url.split("?")[0];
  let result = {};

  for (const [pattern, handler] of PATTERNS) {
    const patternResult = pattern.exec(input);
    if (patternResult !== null && "pathname" in patternResult) {
      result = handler(patternResult);
      break;
    }
  }
  return result;
};

export async function middleware(req) {
  if (
    req.nextUrl.pathname.startsWith("/teachers") ||
    req.nextUrl.pathname.startsWith("/api/teachers")
  ) {
    if (!(await teacherAccessLevel(req)))
      return NextResponse.redirect(new URL("/login/teachers", req.url));

    console.log("dddd", req.nextUrl.pathname.startsWith("/teachers/:id/edit"));
    if (req.nextUrl.pathname.startsWith("/teachers/[id]/edit")) {
      const { id } = params(req.url);
      console.log("sssss", id);
      if ((await teacherAccessJwt) === id) {
        console.log("auth");
      } else {
        console.log("not auth");
      }
    }
  }
  if (
    req.nextUrl.pathname.startsWith("/students") ||
    req.nextUrl.pathname.startsWith("/api/students")
  ) {
    if (!(await studentAccessLevel(req)))
      return NextResponse.redirect(new URL("/login/students", req.url));
  }
}

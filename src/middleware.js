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

const teacherEditAccess = async (req, id) => {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }
  const jwt = await verify(token.value);

  if (jwt && Number(jwt.payload?.teacherId) === Number(id)) {
    return true;
  }
  return false;
};

const studentEditAccess = async (req, id) => {
  const token = req.cookies.get("token");
  if (!token) {
    return false;
  }
  const jwt = await verify(token.value);
  console.log("jwt", jwt);

  if (
    jwt &&
    (jwt.payload.accessLevel === "teacher" ||
      jwt.payload.accessLevel === "admin")
  ) {
    return true;
  } else if (
    jwt &&
    jwt.payload.accessLevel === "student" &&
    Number(jwt.payload?.studentId) === Number(id)
  ) {
    return true;
  }
  return false;
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
      jwt.payload.accessLevel === "teacher" ||
      jwt.payload.accessLevel === "admin")
  ) {
    return true;
  }
  return false;
};

const PATTERNS = [
  [
    new URLPattern({ pathname: "/teachers/:id/edit" }),
    ({ pathname }) => pathname.groups,
  ],
  [
    new URLPattern({ pathname: "/students/:id/edit" }),
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

    const { id } = params(req.url);
    if (req.nextUrl.pathname === `/teachers/${id}/edit`) {
      if (!(await teacherEditAccess(req, id))) {
        return NextResponse.redirect(new URL(`/teachers/${id}`, req.url));
      }
    }
  }
  if (
    req.nextUrl.pathname.startsWith("/students") ||
    req.nextUrl.pathname.startsWith("/api/students")
  ) {
    if (!(await studentAccessLevel(req)))
      return NextResponse.redirect(new URL("/login/students", req.url));

    const { id } = params(req.url);
    if (req.nextUrl.pathname === `/students/${id}/edit`) {
      if (!(await studentEditAccess(req, id))) {
        return NextResponse.redirect(new URL(`/students/${id}`, req.url));
      }
    }
  }
}

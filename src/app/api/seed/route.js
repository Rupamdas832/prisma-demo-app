import { createAdminUser } from "@/seed/seed";
import { NextResponse } from "next/server";

export async function GET(req) {
  const message = await createAdminUser();
  return NextResponse.json({ message });
}

import { decodeToken } from "@/lib/utils/auth";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const token =
    (await request.json())?.authToken || cookies().get("JWT_TOKEN")?.value;

  if (!token)
    return NextResponse.json(
      { user: null, isAuthenticated: false },
      { status: 405 }
    );

  const user = decodeToken(token);
  return NextResponse.json({ user }, { status: user?.verified ? 405 : 200 });
}

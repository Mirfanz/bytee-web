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
  try {
    const user = await decodeToken(token);
    return NextResponse.json({
      user,
      isAuthenticated: true,
    });
  } catch (error) {
    return NextResponse.json(
      { user: null, isAuthenticated: false },
      { status: 405 }
    );
  }
}

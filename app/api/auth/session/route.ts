import { createToken, decodeToken } from "@/lib/utils/auth";
import prisma from "@/prisma";
import { SessionType } from "@/types";
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

export async function PUT(request: NextRequest) {
  console.log("UPDATE SESSION ===========");

  try {
    const token = cookies().get("JWT_TOKEN")?.value;
    if (!token) throw new Error("Token not found");

    const currentSession = decodeToken(token);
    if (!currentSession) throw new Error("Token invalid");

    const user = await prisma.user.findUnique({
      where: { email: currentSession.email },
    });
    if (!user) throw new Error("User not found");

    const newSession: SessionType = {
      email: user.email,
      image: user.image,
      role: user.role,
      name: user.name,
      verified: user.verified,
    };
    cookies().set("JWT_TOKEN", createToken(newSession));

    return NextResponse.json(
      { success: "Session updated", data: newSession },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 405 });
  } finally {
    prisma.$disconnect();
  }
}

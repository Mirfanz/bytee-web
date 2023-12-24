import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const deviceId: string | null = request.nextUrl.searchParams.get("device_id");
  const apiKey: string | null = request.nextUrl.searchParams.get("api_key");

  console.log(deviceId, apiKey);

  if (!apiKey || !deviceId)
    return NextResponse.json(
      { error: "device_id and api_key is needed" },
      { status: 400 }
    );

  try {
    const result = await prisma.device
      .findUnique({
        where: {
          id: deviceId,
          user: { apiKey },
        },
      })
      .finally(() => prisma.$disconnect());
    console.log(result);

    if (!result) throw new Error("Invalid device_id or api_key");

    return NextResponse.json({
      success: "Latest info device " + result?.name,
      data: result,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

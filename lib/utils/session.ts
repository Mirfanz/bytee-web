import jwt from "jsonwebtoken";
import * as jose from "jose";
import { cookies } from "next/headers";

export interface UserType {
  name: string;
  email: string;
  image?: string | null;
  role: "user" | "member" | "admin";
  verified: boolean;
}

export interface SessionType {
  user: UserType | null;
  session: {
    exp?: number;
  } | null;
}

export async function getServerSession(
  token: string | undefined = undefined
): Promise<SessionType> {
  const authToken = token || cookies().get("JWT_TOKEN")?.value;
  if (!authToken) return { user: null, session: null };

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const { payload, protectedHeader } = await jose.jwtVerify(
      authToken,
      secret,
      {
        algorithms: ["HS256"],
      }
    );
    return {
      user: {
        name: payload.name,
        email: payload.email,
        image: payload.image,
        role: payload.role,
        verified: payload.verified,
      } as UserType,
      session: { exp: payload.exp },
    };
  } catch (error: any) {
    console.log("Invalid JWT");

    return { user: null, session: null };
  }
}

export async function generateToken(payload: UserType): Promise<string> {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new jose.SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7 days")
    .sign(secret);
  return token;
}

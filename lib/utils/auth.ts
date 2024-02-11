import jwt, { JwtPayload } from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { SessionType, UserType } from "@/types";

export function createToken(payload: SessionType): string {
  if (!payload) return "";

  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export function decodeToken(token: string): SessionType {
  try {
    const sessionData: JwtPayload | string = jwt.verify(
      token,
      process.env.JWT_SECRET,
      {}
    );
    if (typeof sessionData === "string") return null;

    return {
      name: sessionData.name,
      email: sessionData.email,
      image: sessionData.image,
      role: sessionData.role,
    };
  } catch (error) {
    console.error("error", error);
    return null;
  }
}

export function hashPassword(password: string) {
  return hashSync(password, 10);
}

export function comparePassword(password: string, hashedPassword: string) {
  return compareSync(password, hashedPassword);
}

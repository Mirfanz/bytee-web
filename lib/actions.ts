"use server";

import prisma from "@/prisma";
import { log } from "console";
import { cookies } from "next/headers";
import { compare, decode, encode, hash } from "./utils/auth";
import { UserType } from "@/types";
import { JwtPayload } from "jsonwebtoken";
import { Prisma } from "@prisma/client";

export interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

export interface SigninProps {
  email: string;
  password: string;
}

export const Register = async ({ email, password, name }: RegisterProps) => {
  const cookie = cookies();
  const hashedPassword = await hash(password);
  try {
    const result = await prisma.user
      .create({
        data: {
          email,
          hashedPassword,
          name,
        },
      })
      .finally(() => prisma.$disconnect());

    const token = await encode({
      name: result.name,
      email: result.email,
      role: "user",
      image: null,
    });
    cookie.set("JWT_TOKEN", token);
    return { success: "Register berhasil.", authToken: token };
  } catch (err: any) {
    const { meta } = err;
    cookie.delete("JWT_TOKEN");
    let message = "Terjadi kesalahan";
    switch (meta?.target) {
      case "User_email_key":
        message = "Email telah terdaftar.";
        break;
      default:
        message = "Error tidak diketahui.";
    }
    return { error: err.code, message };
  }
};

export const Signin = async ({ email, password }: SigninProps) => {
  try {
    const result = await prisma.user
      .findUniqueOrThrow({
        where: { email },
      })
      .finally(() => prisma.$disconnect());

    if (!(await compare(password, result.hashedPassword)))
      throw new Error("Password salah.");

    const token = await encode({
      email: result.email,
      name: result.name,
      image: result.image,
      role: result.role,
    });

    cookies().set("JWT_TOKEN", token);
    return { success: "Login Berhasil.", authToken: token };
  } catch (error: any) {
    return { error: error.code, message: "Email atau password salah" };
  }
};

export const GetSelf = async () => {
  const authToken = await cookies().get("JWT_TOKEN");
  if (!authToken?.value) return null;
  try {
    const decodedToken = await decode(authToken.value);
    return decodedToken;
  } catch (error) {
    cookies().delete("JWT_TOKEN");
    return null;
  }
};

export const FetchRooms = async () => {
  const user: JwtPayload | null = await GetSelf();
  // if (!user) return { error: 403, message: "Login required" };
  if (!user) throw new Error("Login required");

  return prisma.room
    .findMany({ where: { user: { email: user.email } } })
    .catch(() => null)
    .finally(() => prisma.$disconnect());
};

export const FetchDevices = async () => {
  const user: JwtPayload | null = await GetSelf();
  if (!user) throw new Error("SDss");

  return prisma.device
    .findMany({
      where: { user: { email: user.email } },
      include: { room: true },
    })
    .catch(() => null)
    .finally(() => prisma.$disconnect());
};

"use server";

import prisma from "@/prisma";
import { cookies } from "next/headers";
import { compare, decode, encode, hash } from "./utils/auth";
import { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";

export interface RegisterProps {
  email: string;
  password: string;
  name: string;
}

export interface SigninProps {
  email: string;
  password: string;
}

export interface AddRoomProps {
  name: string;
  description: string | undefined | null;
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
    cookie.set("JWT_TOKEN", token, {
      expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    });
    return {
      success: "Register berhasil.",
      authToken: token,
      name: result.name,
    };
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
    return { error: message };
  }
};

export const Signin = async ({ email, password }: SigninProps) => {
  try {
    const result = await prisma.user
      .findUniqueOrThrow({
        where: { email },
      })
      .catch(() => null)
      .finally(() => prisma.$disconnect());
    if (!result) throw new Error("User tidak ditemukan.");

    if (!(await compare(password, result.hashedPassword)))
      throw new Error("Password salah.");

    const token = await encode({
      email: result.email,
      name: result.name,
      image: result.image,
      role: result.role,
    });

    cookies().set("JWT_TOKEN", token, {
      expires: new Date().getTime() + 1000 * 60 * 60 * 24 * 7,
    });
    return { success: "Login Berhasil.", authToken: token, name: result.name };
  } catch (error: any) {
    return { error: error.message || "Email atau password salah." };
  }
};

export const SignOut = async () => {
  console.log(await cookies().delete("JWT_TOKEN"));

  return true;
};

export const GetSelf = async (token: string | undefined = undefined) => {
  const authToken = token || (await cookies().get("JWT_TOKEN"))?.value;

  if (!authToken) return null;
  try {
    const decodedToken = await decode(authToken);
    return decodedToken;
  } catch (error) {
    cookies().delete("JWT_TOKEN");
    return null;
  }
};

export const FetchRooms = async (roomId: string | undefined = undefined) => {
  const user: JwtPayload | null = await GetSelf();
  if (!user) redirect("/login");

  return prisma.room
    .findMany({
      where: {
        id: roomId,
        user: { email: user.email },
      },
      include: { devices: true },
    })
    .catch(() => null)
    .finally(() => prisma.$disconnect());
};

export const AddRoom = async ({ name, description }: AddRoomProps) => {
  const user: any = await GetSelf();
  if (!user) redirect("/login");

  try {
    const result = await prisma.room
      .create({
        data: {
          name,
          description,
          user: { connect: { email: user.email } },
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: "Succesfully add room", roomId: result.id };
  } catch (error: any) {
    return { error: "Gagal menambahkan room baru" };
  }
};

export const DeleteRoom = async (roomID: string) => {
  const user: any = await GetSelf();
  if (!user) redirect("/login");

  try {
    const result = await prisma.room
      .delete({
        where: {
          id: roomID,
          user: { email: user.email },
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: `${result.name} dihapus` };
  } catch (error: any) {
    console.log(error);

    return { error: "Hapus room gagal" };
  }
};

export const FetchDevices = async (
  deviceId: string | undefined = undefined
) => {
  const user: JwtPayload | null = await GetSelf();
  if (!user) redirect("/login");

  return prisma.device
    .findMany({
      where: {
        id: deviceId,
        user: { email: user.email },
      },
      include: { room: true },
    })
    .catch(() => null)
    .finally(() => prisma.$disconnect());
};

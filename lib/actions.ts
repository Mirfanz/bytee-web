"use server";

import prisma from "@/prisma";
import { cookies } from "next/headers";
import { comparePassword, hashPassword } from "./utils/password";
import { redirect } from "next/navigation";

import type {
  RegisterProps,
  AddRoomProps,
  AddDeviceProps,
  SigninProps,
} from "@/types";
import { sendVerification } from "./utils/mail";
import { UserType, generateToken, getServerSession } from "./utils/session";

export const Register = async ({ email, password, name }: RegisterProps) => {
  const cookie = cookies();
  const hashedPassword = hashPassword(password);
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

    const token = await generateToken({
      name: result.name,
      email: result.email,
      role: result.role,
      image: result.image,
      verified: result.verified,
    });

    cookie.set("JWT_TOKEN", token, {
      expires: new Date().getTime() + 60000 * 60 * 24 * 7,
    });

    return {
      success: "Register berhasil.",
      authToken: token,
      name: result.name,
    };
  } catch (error: any) {
    const { meta } = error;
    console.log("error.code", error.code);
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

    if (!comparePassword(password, result.hashedPassword))
      throw new Error("Password salah.");

    const token = await generateToken({
      email: result.email,
      name: result.name,
      image: result.image,
      role: result.role,
      verified: result.verified,
    });

    cookies().set("JWT_TOKEN", token, {
      expires: new Date().getTime() + 60000 * 60 * 24 * 7,
    });

    return {
      success: "Login Berhasil",
      data: {
        email: result.email,
        name: result.name,
        role: result.role,
        image: result.image,
        authToken: token,
        verified: result.verified,
      },
    };
  } catch (error: any) {
    console.log("error.code", error);
    return { error: error.message || "Email atau password salah" };
  }
};

export const SendEmailVerification = async () => {
  const { user } = await getServerSession();
  if (!user) redirect("login");

  try {
    const result = await prisma.emailVerification.create({
      data: {
        user: {
          connect: { email: user.email, verified: false },
        },
      },
    });
    if (!(await sendVerification(user, result.token)))
      return { error: "Gagal mengirim email" };
    return {
      success: "Link verifikasi dikirim",
      data: { createdAt: result.createdAt },
    };
  } catch (error: any) {
    return { error: "Gagal membuat token" };
  } finally {
    prisma.$disconnect();
  }
};

export const GetLastSendEmailVerification = async () => {
  const { user } = await getServerSession();
  if (!user) redirect("login");

  try {
    const result = await prisma.emailVerification.findFirst({
      where: {
        user: { email: user.email },
      },
      orderBy: { createdAt: "desc" },
    });
    // console.log("last Send Email", result);
    if (!result) return null;
    return result.createdAt;
  } catch (error) {
    // console.log("error", error);
    return null;
  } finally {
    prisma.$disconnect();
  }
};

export const VerifyEmail = async (token: string) => {
  try {
    const findToken = await prisma.emailVerification.findFirst({
      where: {
        token: token,
      },
      include: { user: true },
      orderBy: { createdAt: "desc" },
    });
    if (!findToken) return { error: "Token tidak valid" };
    if (findToken.user.verified) {
      // console.log("updateSession", await UpdateSession());
      return { success: "Akun sudah diverifikasi" };
    }

    const findLatestToken = await prisma.emailVerification.findFirst({
      where: {
        user: { email: findToken.user.email },
      },
      orderBy: { createdAt: "desc" },
    });
    if (!findLatestToken) return { error: "Belum membuat token" };
    else if (findToken.token !== findLatestToken.token)
      return { error: "Token Expired" };
    else if (
      new Date().getTime() - findToken.createdAt.getTime() >
      1000 * 60 * 5
    )
      return { error: "Token Expired" };

    const result = await prisma.user.update({
      where: { email: findToken.user.email },
      data: { verified: { set: true } },
    });

    // console.log("updateSession", await UpdateSession());
    return { success: "Verifikasi berhasil" };
  } catch (error: any) {
    return { error: "Verifikasi gagal" };
  } finally {
    prisma.$disconnect();
    await UpdateSession();
  }
};

export const RemoveAccount = async () => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const data = await prisma.user.delete({
      where: { email: user.email },
      select: {
        createdAt: true,
        email: true,
        name: true,
        image: true,
        role: true,
      },
    });
    cookies().delete("JWT_TOKEN");
    return { success: "Akun dihapus", data };
  } catch (error: any) {
    if (error.code === "P2025") return { error: "User tidak ditemukan" };
    return { error: "Gagal menghapus akun" };
  } finally {
    prisma.$disconnect();
  }
};

export const SignOut = async () => {
  cookies().delete("JWT_TOKEN");
  return true;
};

export const UpdateSession = async () => {
  console.log("Update session");

  const currentSession = await getServerSession();
  if (!currentSession.user) return false;

  try {
    const user = await prisma.user.findUnique({
      where: {
        email: currentSession.user.email,
      },
    });

    if (!user) {
      cookies().delete("JWT_TOKEN");
      return false;
    }

    const newSession: UserType = {
      email: user.email,
      image: user.image,
      name: user.name,
      role: user.role,
      verified: user.verified,
    };

    const newToken = await generateToken(newSession);
    console.log("newUserType", newSession);
    cookies().set("JWT_TOKEN", newToken, {
      expires: new Date().getTime() + 60000 * 60 * 24 * 7,
    });
    return true;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

export const FetchUser = async (userId: string | undefined = undefined) => {
  let email: string | undefined;
  const self = userId ? false : true;

  if (self) {
    email = (await getServerSession())?.user?.email;
    if (!email) redirect("/login");
  }

  try {
    const data = await prisma.user
      .findUnique({
        where: { id: userId, email: email },
        select: {
          name: true,
          email: true,
          role: true,
          image: true,
          createdAt: true,
          verified: self,
          updatedAt: self,
          id: self,
          apiKey: self,
          _count: {
            select: { devices: true, rooms: true },
          },
        },
      })
      .finally(() => prisma.$disconnect());
    if (!data) return { error: "Data user tidak ditemukan" };
    return { success: "Data user " + data?.name, data, self };
  } catch {
    return { error: "Gagal mengambil data user" };
  }
};

export const FetchApiKey = async () => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");
  try {
    const data = await prisma.user
      .findUnique({
        where: { email: user.email },
        select: { apiKey: true },
      })
      .finally(() => prisma.$disconnect());
    return data;
  } catch (error) {
    return null;
  }
};

export const FetchRooms = async ({
  roomId,
  asGuest,
}: {
  roomId?: string;
  asGuest?: boolean;
}) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const data = await prisma.room
      .findMany({
        where: {
          id: roomId,
          user: !asGuest ? { email: user.email } : {},
          guests: asGuest
            ? {
                some: {
                  email: user.email,
                },
              }
            : {},
        },
        select: {
          name: true,
          id: true,
          description: true,
          createdAt: true,
          devices: {
            select: {
              id: true,
              name: true,
              active: true,
              createdAt: true,
              description: true,
              state: true,
            },
          },
          guests: {
            select: {
              name: true,
              email: true,
              image: true,
              role: true,
            },
          },
          user: {
            select: {
              email: true,
              image: true,
              name: true,
              role: true,
            },
          },
        },
      })
      .finally(() => prisma.$disconnect());
    return data;
  } catch (error) {
    return null;
  }
};

export const AddGuestAccess = async ({
  roomId,
  email,
}: {
  roomId: string;
  email: string;
}) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  if (email === user.email) return { error: "Email sendiri _-" };

  try {
    const data = await prisma.room
      .update({
        where: {
          id: roomId,
          user: { email: user.email },
        },
        data: {
          guests: { connect: { email } },
        },
        select: {
          name: true,
          id: true,
          description: true,
          createdAt: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: "email ditambahkan", data };
  } catch (error: any) {
    if (error?.code == "P2025") return { error: "Email tidak ditemukan" };
    return { error: "Terjadi kesalahan" };
  }
};

export const RemoveGuestAccess = async ({
  roomId,
  guestEmail,
}: {
  roomId: string;
  guestEmail?: string;
}) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const data = await prisma.room
      .update({
        where: {
          id: roomId,
          user: { email: guestEmail ? user.email : undefined },
        },
        data: {
          guests: { disconnect: { email: guestEmail ?? user.email } },
        },
        select: {
          name: true,
          id: true,
          description: true,
          createdAt: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: "Access removed.", data };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const AddRoom = async ({ name, description }: AddRoomProps) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const data = await prisma.room
      .create({
        data: {
          name,
          description,
          user: { connect: { email: user.email } },
        },
        select: {
          name: true,
          id: true,
          description: true,
          createdAt: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: "Succesfully add room", data };
  } catch {
    return { error: "Gagal menambahkan room baru" };
  }
};

export const UpdateRoom = async ({
  roomId,
  data,
}: {
  roomId: string;
  data: AddRoomProps;
}) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const result = await prisma.room
      .update({
        where: { id: roomId, user: { email: user.email } },
        data: {
          name: data.name,
          description: data.description,
        },
        select: {
          name: true,
          id: true,
          description: true,
          createdAt: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: "Room diedit", data: result };
  } catch {
    return { error: "Gagal mengedit room" };
  }
};

export const DeleteRoom = async (roomId: string) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const data = await prisma.room
      .delete({
        where: {
          id: roomId,
          user: { email: user.email },
        },
        select: {
          name: true,
          id: true,
          description: true,
          createdAt: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: `Room ${data.name} dihapus`, data };
  } catch {
    return { error: "Gagal menghapus room" };
  }
};

export const FetchDevices = async (
  deviceId: string | undefined = undefined
) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const data = await prisma.device
      .findMany({
        where: {
          id: deviceId,
          user: { email: user.email },
        },
        include: { room: true },
      })
      .finally(() => prisma.$disconnect());
    return data;
  } catch (error) {
    return null;
  }
};

export const AddDevice = async ({
  name,
  description,
  roomId,
}: AddDeviceProps) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");
  if (!name) return { error: "Name is required" };
  if (!roomId) return { error: "Please select a room" };
  try {
    const data = await prisma.device
      .create({
        data: {
          name,
          description,
          user: { connect: { email: user.email } },
          room: { connect: { id: roomId } },
        },
        select: {
          id: true,
          active: true,
          name: true,
          createdAt: true,
          description: true,
          roomId: true,
          state: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: "Succesfully add device", data };
  } catch (error) {
    return { error: "Gagal menambah device" };
  }
};

export const DeleteDevice = async (deviceId: string) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");
  try {
    const data = await prisma.device
      .delete({
        where: {
          id: deviceId,
          user: { email: user.email },
        },
        select: {
          id: true,
          active: true,
          name: true,
          createdAt: true,
          description: true,
          roomId: true,
          state: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: `${data.name} dihapus`, data };
  } catch {
    return { error: "Delete device failed" };
  }
};

export const SwitchDevice = async ({
  deviceId,
  state,
}: {
  deviceId: string;
  state: boolean;
}) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");
  try {
    const data = await prisma.device
      .update({
        where: {
          id: deviceId,
          OR: [
            { user: { email: user.email } },
            { room: { guests: { some: { email: user.email } } } },
          ],
        },
        data: {
          state,
        },
      })
      .finally(() => prisma.$disconnect());
    return { succes: `${data.name} ${data.state ? "on" : "off"}` };
  } catch {
    return { error: "Terjadi Kesalahan" };
  }
};

export const EditDevice = async ({
  deviceId,
  data,
}: {
  deviceId: string;
  data: AddDeviceProps;
}) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");
  try {
    const result = await prisma.device
      .update({
        where: { id: deviceId, user: { email: user.email } },
        data: {
          name: data.name,
          roomId: data.roomId,
          description: data.description,
        },
        select: {
          id: true,
          active: true,
          name: true,
          createdAt: true,
          description: true,
          roomId: true,
          state: true,
        },
      })
      .finally(() => prisma.$disconnect());
    return { success: "Device diedit", data: result };
  } catch {
    return { error: "Gagal mengedit device" };
  }
};

export const FetchNotifications = async (
  notifId: string | undefined = undefined
) => {
  const { user } = await getServerSession();
  if (!user) redirect("/login");

  try {
    const data = await prisma.notification
      .findMany({
        where: {
          id: notifId,
          OR: [
            { user: null },
            {
              user: {
                email: user.email,
              },
            },
          ],
        },
        orderBy: { createdAt: "desc" },
      })
      .finally(() => prisma.$disconnect());
    return { success: "Success", data };
  } catch {
    return { error: "Terjadi kesalahan saat mengambil data notifikasi" };
  }
};

import { FetchRooms, GetSelf } from "@/lib/actions";
import Room from "./room";
import { Prisma, PrismaClient } from "@prisma/client";
import { RedirectType, redirect } from "next/navigation";

export default async function RoomPage() {
  const user = await GetSelf();
  if (!user) return redirect("/login", RedirectType.replace);

  const rooms: Prisma.RoomGetPayload<true>[] | null = await FetchRooms();
  if (!rooms) return <h1>Terjadi Kesalahan</h1>;

  return <Room rooms={rooms} />;
}

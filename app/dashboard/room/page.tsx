import { FetchRooms, GetSelf } from "@/lib/actions";
import Room from "./room";
import { Prisma, PrismaClient } from "@prisma/client";
import { RedirectType, redirect } from "next/navigation";
import { log } from "console";

export default async function RoomPage() {
  const rooms: Prisma.RoomGetPayload<null>[] | null = await FetchRooms();
  if (!rooms) return <h1>Terjadi Kesalahan</h1>;

  return <Room rooms={rooms} />;
}

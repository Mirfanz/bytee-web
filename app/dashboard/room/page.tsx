import { FetchRooms } from "@/lib/actions";
import Room from "../../ui/dashboard/room";
import { Prisma } from "@prisma/client";
import type { RoomType } from "@/types";

export default async function RoomPage() {
  const rooms: RoomType[] | null = await FetchRooms({});

  const guestRooms: RoomType[] | null = await FetchRooms({ asGuest: true });

  if (!rooms) return <h1>Terjadi Kesalahan</h1>;

  return <Room rooms={rooms} guestRooms={guestRooms} />;
}

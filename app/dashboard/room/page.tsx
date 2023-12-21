import { FetchRooms } from "@/lib/actions";
import Room from "../../ui/dashboard/room";
import { Prisma } from "@prisma/client";

export default async function RoomPage() {
  const rooms: Prisma.RoomGetPayload<null>[] | null = await FetchRooms();
  if (!rooms) return <h1>Terjadi Kesalahan</h1>;

  return <Room rooms={rooms} />;
}

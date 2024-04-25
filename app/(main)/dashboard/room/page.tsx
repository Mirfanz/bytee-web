import { FetchRooms } from "@/lib/actions";
import Room from "../../../ui/dashboard/room";
import { Prisma } from "@prisma/client";
import type { RoomType } from "@/types";
import ErrorComponent from "@/app/ui/error";

export default async function RoomPage() {
  const rooms = await FetchRooms({});

  const guestRooms = await FetchRooms({ asGuest: true });

  if (rooms.error)
    return <ErrorComponent message={rooms.error} status="error" />;

  return <Room rooms={rooms.data} guestRooms={guestRooms.data} />;
}

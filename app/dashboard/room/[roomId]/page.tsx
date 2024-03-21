import { PageProps, RoomType } from "@/types";
import RoomDetail from "../../../ui/dashboard/room/detail";
import { FetchRooms } from "@/lib/actions";
import { notFound } from "next/navigation";
import ErrorComponent from "@/app/ui/error";

export default async function RoomDetailPage({ params }: PageProps) {
  const { roomId } = params;
  let guest = false;
  let room = (await FetchRooms({ roomId, asGuest: false })).data;

  if (!room?.length) {
    guest = true;
    room = (await FetchRooms({ roomId, asGuest: true })).data;
  }

  if (!room)
    return <ErrorComponent status="error" message={"Gagal mengambil data"} />;

  if (!room?.length) notFound();

  return <RoomDetail guest={guest} room={room[0]} />;
}

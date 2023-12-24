import Edit from "@/app/ui/dashboard/room/edit";
import { FetchRooms } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function EditRoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const room = await FetchRooms(params.roomId);

  if (!room?.length) return notFound();
  return <Edit room={room[0]} />;
}

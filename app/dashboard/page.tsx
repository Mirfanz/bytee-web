import { FetchRooms } from "@/lib/actions";
import Dashboard from "../ui/dashboard/dashboard";

export default async function DashboardPage() {
  const rooms = await FetchRooms({});
  const guestRooms = await FetchRooms({ asGuest: true });

  return <Dashboard rooms={rooms} guestRooms={guestRooms} />;
}

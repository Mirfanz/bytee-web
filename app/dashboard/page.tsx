import { FetchRooms } from "@/lib/actions";
import Dashboard from "../ui/dashboard/dashboard";

export default async function DashboardPage() {
  const rooms = await FetchRooms();

  return <Dashboard rooms={rooms} />;
}

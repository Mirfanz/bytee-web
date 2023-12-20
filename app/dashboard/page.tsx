import { FetchRooms } from "@/lib/actions";
import Dashboard from "./dashboard";

export default async function DashboardPage() {
  const rooms = await FetchRooms();

  return <Dashboard rooms={rooms} />;
}

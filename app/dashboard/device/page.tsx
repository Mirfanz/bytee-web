import { FetchDevices } from "@/lib/actions";
import Device from "../../ui/dashboard/device";

export default async function DevicePage() {
  const devices = await FetchDevices();

  if (!devices) return <h1>Terjadi Kesalahan</h1>;

  return <Device devices={devices} />;
}

import { FetchDevices, GetSelf } from "@/lib/actions";
import Device from "./device";
import { RedirectType, redirect } from "next/navigation";

export default async function DevicePage() {
  const user = await GetSelf();
  if (!user) return redirect("/login", RedirectType.replace);

  const devices = await FetchDevices();

  if (!devices) return <h1>Terjadi Kesalahan</h1>;

  return <Device devices={devices} />;
}

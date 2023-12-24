import Edit from "@/app/ui/dashboard/device/edit";
import { FetchDevices } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function EditPage({
  params,
}: {
  params: { deviceId: string };
}) {
  const device = await FetchDevices(params.deviceId);
  if (!device) return notFound();

  return <Edit device={device[0]} />;
}

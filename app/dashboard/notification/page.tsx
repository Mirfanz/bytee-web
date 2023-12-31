import Notification from "@/app/ui/dashboard/notification";
import ErrorComponent from "@/app/ui/error";
import { FetchNotifications } from "@/lib/actions";
import { notFound } from "next/navigation";

export default async function NotificationPage() {
  let errorMessage: string = "";
  const notifications = await FetchNotifications()
    .then((result) => {
      if (result.error) throw new Error(result.error);
      return result.data;
    })
    .catch((error) => {
      errorMessage = error.message;
    });

  if (!notifications)
    return <ErrorComponent message={errorMessage} status="error" />;
  if (!notifications.length)
    return <ErrorComponent message={"Belum ada notifikasi"} status="warning" />;

  return <Notification notifications={notifications} />;
}

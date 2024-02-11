import Profile from "../../ui/dashboard/profile";
import { notFound } from "next/navigation";
import { FetchUser } from "@/lib/actions";

export default async function ProfilePage() {
  const result: any = await FetchUser();
  if (result.error) notFound();

  return <Profile self={result.self} profile={result.data} />;
}

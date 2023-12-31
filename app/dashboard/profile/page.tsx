import Profile from "../../ui/dashboard/profile";
import { RedirectType, notFound, redirect } from "next/navigation";
import { FetchUser, GetSelf } from "@/lib/actions";

export default async function ProfilePage() {
  const result = await FetchUser();
  if (result.error) notFound();

  return <Profile self={result.self} profile={result.data} />;
}

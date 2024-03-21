import Profile from "../../ui/dashboard/profile";
import { notFound } from "next/navigation";
import { FetchUser } from "@/lib/actions";
import ErrorComponent from "@/app/ui/error";

export default async function ProfilePage() {
  const result = await FetchUser();
  console.log(result);

  if (result.error)
    return <ErrorComponent message={result.error} status="error" />;

  if (!result.data) notFound();

  return <Profile self={result.self} profile={result.data} />;
}

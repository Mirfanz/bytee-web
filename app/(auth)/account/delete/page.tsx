import DeleteAccount from "@/app/ui/auth/account/delete";
import { GetSelf } from "@/lib/actions";
import { RedirectType, redirect } from "next/navigation";

export default async function DeleteAccountPage() {
  const sessionData = await GetSelf();
  if (!sessionData) return redirect("/login", RedirectType.replace);
  return <DeleteAccount sessionData={sessionData} />;
}

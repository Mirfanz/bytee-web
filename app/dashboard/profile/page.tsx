import { cookies, headers } from "next/headers";
import Profile from "./Profile";
import { decode } from "@/lib/utils/auth";
import { RedirectType, notFound, redirect } from "next/navigation";
import { GetSelf } from "@/lib/actions";

export default async function ProfilePage() {
  const user = await GetSelf();
  if (user == null) redirect("/login", RedirectType.replace);
  return <Profile user={user} />;
}

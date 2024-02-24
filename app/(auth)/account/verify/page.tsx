import VerifiedPage from "@/app/ui/auth/account/verified-page";
import VerifyPage from "@/app/ui/auth/account/verify";
import {
  GetLastSendEmailVerification,
  GetSelf,
  SendEmailVerification,
} from "@/lib/actions";
import { SessionType } from "@/types";
import { RedirectType, redirect } from "next/navigation";

export default async function () {
  const sessionData: SessionType = await GetSelf();
  if (!sessionData) return redirect("/login");
  if (sessionData.verified) return <VerifiedPage sessionData={sessionData} />;

  let lastSendEmailVerification =
    (await GetLastSendEmailVerification())?.getTime() || 0;

  const delay: number = process.env.VERIFICATION_DELAY;
  let timeGap: number = new Date().getTime() - lastSendEmailVerification;
  const wait = Math.floor((delay * 1000 - timeGap) / 1000);
  return (
    <VerifyPage
      sessionData={sessionData}
      wait={wait > 0 ? wait : 0}
      delay={delay}
    />
  );
}

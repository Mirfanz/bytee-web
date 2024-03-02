import { PageProps } from "@/.next/types/app/layout";
import VerifiedPage from "@/app/ui/auth/account/verified-page";
import VerifyPage from "@/app/ui/auth/account/verify";
import { GetLastSendEmailVerification, GetSelf } from "@/lib/actions";
import { SessionType } from "@/types";

export default async function ({ searchParams }: PageProps) {
  const sessionData: SessionType = await GetSelf();
  if (sessionData?.verified) return <VerifiedPage sessionData={sessionData} />;

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

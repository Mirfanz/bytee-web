import VerifiedPage from "@/app/ui/auth/account/verified-page";
import VerifyPage from "@/app/ui/auth/account/verify";
import { GetLastSendEmailVerification } from "@/lib/actions";
import { SessionType, getServerSession } from "@/lib/utils/session";
import { PageProps } from "@/types";

export default async function verifyPage({ searchParams }: PageProps) {
  const { user }: SessionType = await getServerSession();
  if (user?.verified) return <VerifiedPage user={user} />;

  let lastSendEmailVerification =
    (await GetLastSendEmailVerification())?.getTime() || 0;

  const delay: number = process.env.VERIFICATION_DELAY;
  let timeGap: number = new Date().getTime() - lastSendEmailVerification;
  const wait = Math.floor((delay * 1000 - timeGap) / 1000);
  return <VerifyPage user={user} wait={wait > 0 ? wait : 0} delay={delay} />;
}

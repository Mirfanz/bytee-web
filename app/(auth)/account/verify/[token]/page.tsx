import VerifyingPage from "@/app/ui/auth/account/token";
import { PageProps } from "@/types";

export default async function verifyTokenPage({
  params,
  searchParams,
}: PageProps) {
  const { token } = params;

  return <VerifyingPage token={token} />;
}

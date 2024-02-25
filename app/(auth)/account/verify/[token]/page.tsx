import { PageProps } from "@/.next/types/app/layout";
import VerifyingPage from "@/app/ui/auth/account/token";

export default async function ({ params, searchParams }: PageProps) {
  const { token } = params;

  return <VerifyingPage token={token} />;
}

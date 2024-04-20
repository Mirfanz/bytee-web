import React, { Suspense } from "react";
import HomeNavbar from "../ui/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HomeNavbar />
      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </>
  );
}

import React, { Suspense } from "react";
import Navbar from "../ui/auth/navbar";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </>
  );
}

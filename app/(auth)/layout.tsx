import React, { Suspense } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* <nav className="sticky top-0 text-center bg-blue-500 py-3">
        <div className="container">
          <h1 className="text-lg font-bold">Navbar Auth</h1>
        </div>
      </nav> */}
      <Suspense fallback={<h1>Loading...</h1>}>{children}</Suspense>
    </>
  );
}

import React, { Suspense } from "react";
import Sidebar from "../../ui/dashboard/sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="flex">
        <div
          className="w-96 bg-white sticky top-16 hidden lg:block overflow-y-auto"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <Sidebar />
        </div>
        <div className=" w-full">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
}

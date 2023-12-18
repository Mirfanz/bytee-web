import React, { Suspense } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="flex">
        <div
          className=" w-80 bg-white sticky top-16 hidden lg:block overflow-y-scroll"
          style={{ height: "calc(100vh - 4rem)" }}
        >
          <Sidebar />

          <div className="bg-indigo-100 bg-opacity-30 -z-10 h-60 bottom-2 sticky left-0 right-0 rounded-lg m-2 "></div>
        </div>
        <div className=" w-full">
          <Suspense>{children}</Suspense>
        </div>
      </div>
    </>
  );
}

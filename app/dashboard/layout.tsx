import React, { Suspense } from "react";
import Navbar from "../ui/dashboard/navbar";
import Sidebar from "../ui/dashboard/sidebar";
import { Drawer } from "@material-tailwind/react";

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

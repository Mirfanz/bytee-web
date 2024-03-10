"use client";

import { Bars3BottomLeftIcon } from "@heroicons/react/20/solid";
import { Button, Drawer, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Sidebar from "./sidebar";
import { Audiowide } from "next/font/google";

const font = Audiowide({ weight: ["400"], subsets: ["latin", "latin-ext"] });

type Props = {};

const Navbar = (props: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <nav className="sticky z-50 top-0 bg-indigo-900">
        <div className="container gap-3 flex items-center py-3 ">
          <Link
            href={"/"}
            className={
              " flex items-center gap-2 text-3xl text-gray-100 " +
              font.className
            }
          >
            <Image
              width={500}
              height={500}
              src={"/icon.png"}
              className="w-10 h-10"
              alt="logo"
            />
            Bytee
          </Link>
          <div className="ms-auto text-gray-100 items-center gap-8 hidden lg:flex">
            <Link href={"/"}>Beranda</Link>
            <Link href={"#"}>Dokumentasi</Link>
            <Link href={"#"}>Tentang Kami</Link>
            <Link href={"#"}>Feedback</Link>
            <Button
              className="-"
              placeholder={""}
              size="sm"
              color="deep-orange"
            >
              Upgrade Pro
            </Button>
          </div>
          <IconButton
            placeholder={""}
            className="ms-auto me-1 lg:hidden"
            variant="outlined"
            color="white"
            onClick={() => setOpen(!open)}
          >
            <Bars3BottomLeftIcon className="w-6 h-6" />
          </IconButton>
        </div>
      </nav>

      <Drawer
        placeholder={""}
        open={open}
        // className="sticky top-0"
        overlay
        overlayProps={{ className: "fixed" }}
        onClose={() => setOpen(false)}
      >
        <div
          className="overflow-y-auto h-full "
          style={{ scrollbarWidth: "thin" }}
        >
          <Sidebar />
        </div>
      </Drawer>
    </>
  );
};

export default Navbar;

"use client";

import { Button } from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Audiowide } from "next/font/google";
import { usePathname } from "next/navigation";

const font = Audiowide({ weight: ["400"], subsets: ["latin", "latin-ext"] });

type Props = {};

const Navbar = (props: Props) => {
  const pathname = usePathname();

  return (
    <>
      <nav className="fixed left-0 right-0 z-50 top-0 bg-indigo-900">
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
          <div className="ms-auto text-gray-100 items-center gap-8">
            <Link href={"/"} replace>
              <Button
                className="-"
                placeholder={""}
                size="sm"
                color="deep-orange"
              >
                Beranda
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

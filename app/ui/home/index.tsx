"use client";

import React from "react";
import Image from "next/image";
import { Button, Chip, IconButton } from "@material-tailwind/react";
import {
  ClipboardDocumentListIcon,
  DocumentIcon,
  FlagIcon,
  RectangleGroupIcon,
  UserCircleIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useSession } from "@/app/session-provider";
import HomeNavbar from "../navbar";
import Link from "next/link";
import {
  BellAlertIcon,
  CursorArrowRippleIcon,
} from "@heroicons/react/24/outline";

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();

  const { user } = useSession();

  return (
    <main className="h-screen w-screen overflow-hidden">
      <Image
        src={"/img/home-bg.jpg"}
        width={500}
        height={500}
        className="object-cover object-right -z-10 fixed w-screen h-screen brightness-75"
        alt="background"
      />
      <div className="flex container h-full md:translate-y-8 flex-col md:flex-row md:px-8 md:gap-4">
        <div className="h-full order-1 md:order-none w-full flex justify-evenly md:justify-center md:items-start flex-col">
          <div className="flex flex-col">
            <Chip
              value="Indonesia Berkarya"
              icon={<CursorArrowRippleIcon className="h-5 w-5" />}
              className="w-max mx-auto md:ms-0 mb-4"
              color="yellow"
              variant="outlined"
            />
            <h1 className="text-gray-100 font-semibold max-w-3xl md:mb-10 text-3xl text-center md:text-left md:text-5xl">
              Sedikit Kreativitas Cukup <br /> Untuk Berinovasi.
            </h1>
          </div>
          <div className="flex mx-10 md:mx-0 md:items-center gap-3 flex-col md:flex-row">
            {user ? (
              <Link href={"/dashboard"}>
                <Button
                  placeholder={""}
                  color="yellow"
                  variant="gradient"
                  className="flex gap-3 justify-center items-center w-full"
                >
                  <RectangleGroupIcon className="w-5 h-5" />
                  Dashboard
                </Button>
              </Link>
            ) : (
              <Link href={"/login"}>
                <Button
                  placeholder={""}
                  color="yellow"
                  variant="gradient"
                  className="flex gap-3 justify-center items-center w-full"
                >
                  <UserIcon className="w-5 h-5" />
                  Login Account
                </Button>
              </Link>
            )}
            <Button
              placeholder={""}
              color="yellow"
              variant="outlined"
              className="flex gap-3 justify-center items-center"
            >
              <ClipboardDocumentListIcon className="w-5 h-5" />
              Documentation
            </Button>
          </div>
        </div>
        <div className="bg-green-5000 md:h-full mt-20 md:mt-0 w-full justify-center items-center flex">
          <iframe
            className="rounded-xl shadow-lg shadow-gray-900 md:mx-10 w-full aspect-video"
            src="https://www.youtube.com/embed/XZfPf080cvQ?si=cVkMF4tJ9iyCL7-h"
            title="YouTube video player"
            referrerPolicy="strict-origin-when-cross-origin"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </main>
  );
};

export default Home;

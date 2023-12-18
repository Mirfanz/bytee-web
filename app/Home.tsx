"use client";

import React from "react";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import { UserIcon } from "@heroicons/react/24/outline";
import { RectangleGroupIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

type Props = {};

const Home = (props: Props) => {
  const router = useRouter();
  return (
    <main>
      <Image
        src={"/chip-bg.jpeg"}
        width={500}
        height={500}
        className="object-cover -z-10 fixed w-screen h-screen blur-sm"
        alt="background"
      />
      <div className="container w-screen h-screen flex flex-col gap-12 z-10 items-center text-center justify-center">
        <Typography
          placeholder={""}
          variant="h1"
          className="text-gray-50 max-w-3xl text-6xl"
        >
          Wujudkan Dunia Yang Modern Biar Bisa Melawan Alien!
        </Typography>
        <div className="flex gap-3">
          <Button
            placeholder={""}
            variant="outlined"
            color="orange"
            className="flex gap-4 items-center"
            onClick={() => {
              router.push("/dashboard");
            }}
          >
            <RectangleGroupIcon className="w-5 h-5" />
            Dashboard
          </Button>
          <Button
            placeholder={""}
            variant="gradient"
            color="orange"
            className="flex gap-4 items-center"
            onClick={() => {
              router.push("/dashboard/profile");
            }}
          >
            <UserCircleIcon className="w-5 h-5" /> Account
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Home;

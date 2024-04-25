"use client";

import React, { useState } from "react";
import {
  Button,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import { usePathname } from "next/navigation";
import {
  BellAlertIcon,
  ExclamationCircleIcon,
  FingerPrintIcon,
  HomeModernIcon,
  PowerIcon,
  RectangleGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { useSession, signOut } from "@/app/session-provider";

type Props = {};

const Sidebar = (props: Props) => {
  const pathname = usePathname();
  const listItems = [
    {
      label: "Dashboard",
      icon: <RectangleGroupIcon className="h-5 w-5" />,
      path: "/dashboard",
      active: pathname === "/dashboard",
    },
    {
      label: "Rooms",
      icon: <HomeModernIcon className="h-5 w-5" />,
      path: "/dashboard/room",
      active: pathname.startsWith("/dashboard/room"),
    },
    // {
    //   label: "Schedule",
    //   icon: <CalendarDaysIcon className="h-5 w-5" />,
    //   path: "#",
    //   active: pathname.startsWith("/dashboard/schedule"),
    // },
    {
      label: "Credential",
      icon: <FingerPrintIcon className="h-5 w-5" />,
      path: "/dashboard/credential",
      active: pathname === "/dashboard/credential",
    },
    {
      label: "Notification",
      icon: <BellAlertIcon className="h-5 w-5" />,
      path: "/dashboard/notification",
      active: pathname === "/dashboard/notification",
    },
  ];
  const { user } = useSession();

  return (
    <List placeholder={""} className="gap-2 mx-1">
      <ListItem
        placeholder={""}
        className={`flex lg:hidden py-4 text-xl justify-center gap-2 font-bold items-center !bg-white rounded-none border-indigo-600 duration-100`}
      >
        <Image
          width={500}
          height={500}
          src={"/icon.png"}
          className="w-8 h-8"
          alt="logo"
        />
        Bytee Indonesia
      </ListItem>
      {listItems.map((item, index) => (
        <Link key={index} href={item.path}>
          <ListItem
            placeholder={""}
            className={`py-4 bg-gray-50 duration-100 ${
              item.active
                ? "  !bg-indigo-50 !text-indigo-700 font-medium md:font-semibold"
                : " text-gray-700"
            }`}
          >
            <ListItemPrefix placeholder={""}>{item.icon}</ListItemPrefix>
            {item.label}
          </ListItem>
        </Link>
      ))}
      <div className="flex mt-4 me-2 justify-between items-center">
        <h5 className="font-medium md:font-semibold">Account</h5>
        <ExclamationCircleIcon className="w-4 h-4" />
      </div>
      {user ? (
        <>
          <Link href={"/dashboard/profile"}>
            <ListItem
              placeholder={""}
              className={`py-4 bg-gray-50 duration-100 text-gray-700 ${
                pathname.startsWith("/dashboard/profile")
                  ? "  !bg-indigo-50 !text-indigo-700 font-medium md:font-semibold"
                  : " text-gray-700"
              }`}
            >
              <ListItemPrefix placeholder={""}>
                <UserIcon className="w-5 h-5" />
              </ListItemPrefix>
              Profile
            </ListItem>
          </Link>
          <ListItem
            placeholder={""}
            className={"py-4 bg-gray-50 duration-100 text-gray-700"}
            onClick={() => {
              signOut();
            }}
          >
            <ListItemPrefix placeholder={""}>
              <PowerIcon className="h-5 w-5" />
            </ListItemPrefix>
            Log Out
          </ListItem>
        </>
      ) : (
        <Link href={"/login"}>
          <Button placeholder={""} className="w-full" color="indigo">
            Login Account
          </Button>
        </Link>
      )}
    </List>
  );
};

export default Sidebar;

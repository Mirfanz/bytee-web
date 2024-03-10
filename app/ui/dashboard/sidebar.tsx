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
  ArrowLeftOnRectangleIcon,
  BellAlertIcon,
  FingerPrintIcon,
  HomeModernIcon,
  RectangleGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import SignoutModal from "@/app/ui/modals/signout";

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
    {
      label: "Account",
      icon: <UserIcon className="h-5 w-5" />,
      path: "/dashboard/profile",
      active: pathname === "/dashboard/profile",
    },
    // {
    //   label: "Sign Out",
    //   icon: <ArrowLeftOnRectangleIcon className="h-5 w-5" />,
    //   path: "/signout",
    // },
  ];

  const [openSignout, setOpenSignout] = useState<boolean>(false);
  return (
    <List placeholder={""} className="gap-2 mx-1">
      <ListItem
        placeholder={""}
        className={`flex lg:hidden py-4  text-xl justify-center gap-2 font-bold items-center !bg-white rounded-none border-indigo-600 duration-100`}
      >
        <Image
          width={500}
          height={500}
          src={"/icon.png"}
          className="w-8 h-8"
          alt="logo"
        />{" "}
        Bytee Indonesia
      </ListItem>
      {listItems.map((item, index) => (
        <Link key={index} href={item.path}>
          <ListItem
            placeholder={""}
            className={`flex py-4 items-center  bg-gray-50 duration-100 ${
              item.active
                ? "  !bg-indigo-50 !text-indigo-700 font-medium"
                : " text-gray-700"
            }`}
          >
            <ListItemPrefix placeholder={""}>{item.icon}</ListItemPrefix>
            {item.label}
          </ListItem>
        </Link>
      ))}
      <ListItem
        placeholder={""}
        className={
          "flex py-4 items-center  bg-gray-50 duration-100 text-gray-700"
        }
        onClick={() => {
          setOpenSignout(true);
        }}
      >
        <ListItemPrefix placeholder={""}>
          <ArrowLeftOnRectangleIcon className="h-5 w-5" />
        </ListItemPrefix>
        Log Out
      </ListItem>
      <SignoutModal
        isOpen={openSignout}
        onClose={() => {
          setOpenSignout(false);
        }}
      />
    </List>
  );
};

export default Sidebar;

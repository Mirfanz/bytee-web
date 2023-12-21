"use client";

import React from "react";
import { List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import { CubeIcon } from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import {
  ArrowLeftOnRectangleIcon,
  BellAlertIcon,
  CalendarDaysIcon,
  CpuChipIcon,
  FingerPrintIcon,
  HomeModernIcon,
  PowerIcon,
  RectangleGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

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
      label: "Devices",
      icon: <CpuChipIcon className="h-5 w-5" />,
      path: "/dashboard/device",
      active: pathname.startsWith("/dashboard/device"),
    },
    {
      label: "Rooms",
      icon: <HomeModernIcon className="h-5 w-5" />,
      path: "/dashboard/room",
      active: pathname.startsWith("/dashboard/room"),
    },
    {
      label: "Schedule",
      icon: <CalendarDaysIcon className="h-5 w-5" />,
      path: "/dashboard/schedule",
      active: pathname.startsWith("/dashboard/schedule"),
    },
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
    {
      label: "Sign Out",
      icon: <ArrowLeftOnRectangleIcon className="h-5 w-5" />,
      path: "/signout",
    },
  ];
  return (
    <List placeholder={""}>
      {listItems.map((item, index) => (
        <Link key={index} href={item.path}>
          <ListItem
            placeholder={""}
            className={`flex py-4 items-center rounded-none bg-gray-100 duration-300 ${
              item.active
                ? " border border-indigo-700 !bg-indigo-100 !text-indigo-700 rounded"
                : " text-gray-700"
            }`}
          >
            <ListItemPrefix placeholder={""}>{item.icon}</ListItemPrefix>
            {item.label}
          </ListItem>
        </Link>
      ))}
    </List>
  );
};

export default Sidebar;

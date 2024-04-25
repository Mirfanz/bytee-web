"use client";

import React, { useState } from "react";
import {
  Button,
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
import { signOut, useSession } from "../session-provider";
import type { NavItem } from "@/types";

type Props = {
  navItems: NavItem[];
};

const HomeSidebar = ({ navItems }: Props) => {
  const pathname = usePathname();
  const inDashboard = pathname.startsWith("/dashboard");
  const { user } = useSession();

  const dashboardNavItems = [
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

  return (
    <div className="flex flex-col p-1">
      <div
        className={`flex lg:hidden sticky top-0 py-4 text-xl justify-center gap-2 font-bold items-center !bg-white rounded-none border-indigo-600 duration-100`}
      >
        <Image
          width={500}
          height={500}
          src={"/icon.png"}
          className="w-8 h-8"
          alt="logo"
        />
        Bytee Corp.
      </div>
      <List placeholder={""} className="gap-2">
        {inDashboard ? (
          <Link href={navItems[0].path}>
            <ListItem
              placeholder={""}
              className={`py-4 bg-gray-50 duration-100 ${
                navItems[0].active
                  ? "  !bg-indigo-50 !text-indigo-700 font-medium md:font-semibold"
                  : " text-gray-700"
              }`}
            >
              <ListItemPrefix placeholder={""}>
                {navItems[0].icon}
              </ListItemPrefix>
              {navItems[0].label}
            </ListItem>
          </Link>
        ) : (
          navItems.map((item, index) => (
            <Link key={"nav-menu-" + index} href={item.path}>
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
          ))
        )}
      </List>
      {inDashboard && (
        <List placeholder={""} className="gap-2">
          <div className="flex mx-2 justify-between items-center">
            <h5 className="font-medium md:font-semibold">Dasboard</h5>
            <ExclamationCircleIcon className="w-4 h-4" />
          </div>
          {dashboardNavItems.map((item, index) => (
            <Link key={"dashboard-menu-" + index} href={item.path}>
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
        </List>
      )}
      <List placeholder={""} className="gap-2">
        <div className="flex mx-2 justify-between items-center">
          <h5 className="font-medium md:font-semibold">Account</h5>
          <ExclamationCircleIcon className="w-4 h-4" />
        </div>

        {user ? (
          <>
            {!inDashboard && (
              <Link href={"/dashboard"}>
                <ListItem
                  placeholder={""}
                  className={"py-4 bg-gray-50 duration-100 text-gray-700"}
                >
                  <ListItemPrefix placeholder={""}>
                    <RectangleGroupIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Dashboard
                </ListItem>
              </Link>
            )}
            <Link href={"/dashboard/profile"}>
              <ListItem
                placeholder={""}
                className={`py-4 bg-gray-50 duration-100 ${
                  pathname === "/dashboard/profile"
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
    </div>
  );
};

export default HomeSidebar;

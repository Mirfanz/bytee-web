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
  ChevronDownIcon,
  ExclamationCircleIcon,
  FingerPrintIcon,
  HomeModernIcon,
  PowerIcon,
  RectangleGroupIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import SignoutModal from "@/app/ui/modals/signout";
import { useSession } from "../session-provider";

type Props = {
  listItems: {
    label: string;
    icon: React.ReactNode;
    path: string;
    active: boolean;
  }[];
};

const HomeSidebar = ({ listItems }: Props) => {
  const pathname = usePathname();
  const { user } = useSession();

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
          <Link href={"/dashboard/profile"}>
            <ListItem
              placeholder={""}
              className={"py-4 bg-gray-50 duration-100 text-gray-700"}
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
              setOpenSignout(true);
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
      <SignoutModal
        isOpen={openSignout}
        onClose={() => {
          setOpenSignout(false);
        }}
      />
    </List>
  );
};

export default HomeSidebar;

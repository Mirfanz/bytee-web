"use client";

import { Bars3BottomLeftIcon } from "@heroicons/react/20/solid";
import {
  Button,
  Drawer,
  IconButton,
  ListItem,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Sidebar from "./sidebar";
import { Audiowide } from "next/font/google";
import {
  ClipboardDocumentIcon,
  EnvelopeIcon,
  HomeIcon,
  RectangleGroupIcon,
} from "@heroicons/react/24/outline";
import {
  UserCircleIcon,
  FingerPrintIcon,
  HomeModernIcon,
  UserIcon,
} from "@heroicons/react/24/solid";
import { usePathname } from "next/navigation";
import { useSession } from "../session-provider";
import SignoutModal from "./modals/signout";
import { UsersIcon } from "@heroicons/react/24/outline";

const font = Audiowide({ weight: ["400"], subsets: ["latin", "latin-ext"] });

type Props = {};

const HomeNavbar = (props: Props) => {
  const pathname = usePathname();
  const { user } = useSession();
  const listItems = [
    {
      label: "Beranda",
      icon: <HomeIcon className="h-5 w-5" />,
      path: "/",
      active: pathname === "/",
    },
    {
      label: "Dokumentasi",
      icon: <ClipboardDocumentIcon className="h-5 w-5" />,
      path: "#",
      active: pathname.startsWith("/docs"),
    },
    {
      label: "Tentang Kami",
      icon: <UsersIcon className="h-5 w-5" />,
      path: "#",
      active: pathname === "/about",
    },
    {
      label: "Masukan",
      icon: <EnvelopeIcon className="h-5 w-5" />,
      path: "#",
      active: pathname === "/feedback",
    },
  ];
  const [open, setOpen] = React.useState<boolean>(false);
  const [signoutModalOpen, setSignoutModalOpen] =
    React.useState<boolean>(false);
  return (
    <>
      <nav className="fixed left-0 right-0 z-50 top-0 backdrop-blur-sm bg-black bg-opacity-20">
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
            {listItems.map((item) => (
              <Link
                key={item.path}
                className={item.active ? "text-orange-700 font-semibold" : ""}
                href={item.path}
              >
                {item.label}
              </Link>
            ))}
            {user ? (
              <Menu placement="bottom-end">
                <MenuHandler>
                  <Button
                    size="sm"
                    variant="outlined"
                    color="white"
                    className="!m-0 flex gap-2 items-center"
                    placeholder={""}
                  >
                    <UserCircleIcon className="w-4 h-4" />
                    {user.name}
                  </Button>
                </MenuHandler>
                <MenuList placeholder={""} className="p-1 text-gray-800">
                  <Link href={"/dashboard"}>
                    <MenuItem placeholder={""}>Dashboard</MenuItem>
                  </Link>
                  <Link href={"/dashboard/profile"}>
                    <MenuItem placeholder={""}>Profile</MenuItem>
                  </Link>
                  <hr className="border-gray-500 my-1" />
                  <MenuItem
                    placeholder={""}
                    className="text-center"
                    onClick={() => setSignoutModalOpen(true)}
                  >
                    Logout Account
                  </MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <Link href={"/login"}>
                <Button
                  size="sm"
                  variant="outlined"
                  color="yellow"
                  className="!m-0 flex gap-2 items-center"
                  placeholder={""}
                >
                  <UserCircleIcon className="w-4 h-4" />
                  Login
                </Button>
              </Link>
            )}
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
          <Sidebar listItems={listItems} />
        </div>
      </Drawer>
      <SignoutModal
        isOpen={signoutModalOpen}
        onClose={() => setSignoutModalOpen(false)}
      />
    </>
  );
};

export default HomeNavbar;

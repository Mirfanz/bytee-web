"use client";

import { RemoveAccount } from "@/lib/actions";
import {
  ChevronRightIcon,
  LockClosedIcon,
  ShareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React, { useState } from "react";
import DeleteAccountModal from "../../modals/delete-account";

type Props = {
  self: boolean | undefined;
  profile: Prisma.UserGetPayload<{
    select: {
      name: true;
      email: true;
      role: true;
      image: true;
      createdAt: true;
      verified: true;
      updatedAt: true;
      id: true;
      apiKey: true;
      _count: {
        select: { devices: true; rooms: true };
      };
    };
  }>;
};

const Profile = ({ self, profile }: Props) => {
  const [openDeleteAccount, setOpenDeleteAccount] = useState<boolean>(false);

  return (
    <main>
      <DeleteAccountModal
        isOpen={openDeleteAccount}
        onClose={() => {
          setOpenDeleteAccount(false);
        }}
        email={profile.email}
      />
      <div className="container  py-4 pb-6 lg:py-8 lg:!px-8">
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="w-full">
            <div className="flex items-center gap-4">
              <Avatar
                placeholder={""}
                src={profile?.image || "/img/no-profile.png"}
                size="xxl"
              />
              <div className="">
                <h1 className="text-xl font-semibold">{profile?.name}</h1>
                <p className="text-sm">{profile?.email}</p>
                <Chip
                  className="w-max mt-1"
                  color="indigo"
                  variant="ghost"
                  value={profile?.role}
                  size="sm"
                />
              </div>
            </div>
            <div className="flex gap-1 mt-3">
              <Button className="grow w-full" color="teal" placeholder={""}>
                Edit Profil
              </Button>
              <Link href={"/dashboard"} className="w-full">
                <Button color="teal" className="w-full" placeholder={""}>
                  Dashboard
                </Button>
              </Link>
              <IconButton placeholder={""} className="grow w-full" color="teal">
                <ShareIcon className="w-5 h-5" />
              </IconButton>
            </div>
          </div>
          <div className="w-full">
            <Card placeholder={""} className="w-full h-full" color="white">
              <CardBody
                placeholder={""}
                className=" justify-center px-2 text-xs md:text-base  items-center text-center flex flex-1"
              >
                Jika kamu tak sanggup menahan lelahnya belajar,
                <br /> Maka bersiaplah menahan pahitnya kebodohan. <br />- Imam
                Syafi&apos;i
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      <div className="container pb-6 lg:!px-8">
        <div className="grid grid-cols-12 gap-4">
          <div className="overflow-y-auto h-auto pb-3 flex flex-col gap-3 col-span-12 md:col-span-6 2xl:col-span-8">
            <Card placeholder={""} className=" gap-3 p-4">
              <h1 className="font-semibold line-clamp-1">
                2024 Pemilu Paling Dungu?
              </h1>
              <hr />
              <p className="line-clamp-3 text-justify">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quae
                labore aspernatur rerum. Consequatur, placeat dolorum sapiente
                ratione ipsum facere dicta incidunt est quae minima impedit
                voluptates eos officia dolores ipsa.
              </p>
            </Card>
            <Card placeholder={""} className=" gap-3 p-4">
              <h1 className="font-semibold line-clamp-1">
                Menjelang Halving Bitcoin Meroket
              </h1>
              <hr />
              <p className="line-clamp-3 text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui,
                ex. Magni ducimus numquam, optio sed soluta obcaecati possimus
                perspiciatis corporis!
              </p>
            </Card>
            <Card placeholder={""} className=" gap-3 p-4">
              <h1 className="font-semibold line-clamp-1">
                Tiktok Shop Mengakali Hukum Indonesia?
              </h1>
              <hr />
              <p className="line-clamp-3 text-justify">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui,
                ex. Magni ducimus numquam, optio sed soluta obcaecati possimus
                perspiciatis corporis!
              </p>
            </Card>
            <Button placeholder={""}>Telusuri Berita Lainnya</Button>
          </div>
          <div className=" col-span-12 mb-auto md:col-span-6 2xl:col-span-4">
            <Card placeholder={""} className="">
              <List placeholder={""}>
                <ListItem placeholder={""}>
                  Total Rooms
                  <ListItemSuffix placeholder={""}>
                    <Chip value={profile?._count.rooms} variant="ghost" />
                  </ListItemSuffix>
                </ListItem>
                <hr />
                <ListItem placeholder={""}>
                  Total Devices
                  <ListItemSuffix placeholder={""}>
                    <Chip value={profile?._count.devices} variant="ghost" />
                  </ListItemSuffix>
                </ListItem>
                <hr />
                <ListItem placeholder={""}>
                  Email
                  <ListItemSuffix placeholder={""}>
                    <Chip
                      value={profile?.email}
                      className="lowercase"
                      variant="ghost"
                    />
                  </ListItemSuffix>
                </ListItem>
                <hr />
                <ListItem placeholder={""}>
                  Telepon
                  <ListItemSuffix placeholder={""}>
                    <Chip value={"-"} variant="ghost" />
                  </ListItemSuffix>
                </ListItem>
                <hr />
                <ListItem placeholder={""}>
                  Akun Dibuat
                  <ListItemSuffix placeholder={""}>
                    <Chip
                      value={profile?.createdAt.toLocaleDateString()}
                      variant="ghost"
                    />
                  </ListItemSuffix>
                </ListItem>
                <hr />
                <Link href={"#"}>
                  <ListItem placeholder={""} className="py-4">
                    <ListItemPrefix placeholder={""}>
                      <LockClosedIcon className="w-5 h-5" />
                    </ListItemPrefix>
                    Ganti Password
                    <ListItemSuffix placeholder={""}>
                      <ChevronRightIcon className="w-4 h-4" />
                    </ListItemSuffix>
                  </ListItem>
                </Link>
                <hr />
                <ListItem
                  onClick={() => {
                    setOpenDeleteAccount(true);
                  }}
                  placeholder={""}
                  className="text-red-400 py-4"
                >
                  <ListItemPrefix placeholder={""}>
                    <TrashIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Hapus Akun
                  <ListItemSuffix placeholder={""}>
                    <ChevronRightIcon className="w-4 h-4" />
                  </ListItemSuffix>
                </ListItem>
              </List>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Profile;

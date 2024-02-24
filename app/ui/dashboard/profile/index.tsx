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
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
} from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  self: boolean | undefined;
  profile:
    | Prisma.UserGetPayload<{
        select: {
          id: true;
          name: true;
          email: true;
          role: true;
          image: true;
          createdAt: true;
          verified: true;
          updatedAt: true;
          apiKey: true;
          _count: { select: { devices: true; rooms: true } };
        };
      }>
    | undefined
    | null;
};

const Profile = ({ self, profile }: Props) => {
  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex w-full mb-6 gap-4">
          <div className="w-full">
            <div className="flex items-center gap-4 mb-6">
              <Avatar
                placeholder={""}
                src={profile?.image || "/no-profile.jpg"}
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
            <div className="flex gap-1">
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
          <div className="hidden md:block w-full">
            <Card placeholder={""} className="w-full h-full" color="white">
              <CardBody
                placeholder={""}
                className=" justify-center items-center"
              >
                Setiap yang bernyawa 10 miliar % akan mati.
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="">
          <Card placeholder={""}>
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
              <ListItem placeholder={""}>
                Sudah Verifikasi
                <ListItemSuffix placeholder={""}>
                  <Chip
                    value={profile?.verified ? "Ya" : "Tidak"}
                    color={profile?.verified ? "green" : "deep-orange"}
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
              <Link href={"/account/delete"}>
                <ListItem placeholder={""} className="text-red-400 py-4">
                  <ListItemPrefix placeholder={""}>
                    <TrashIcon className="w-5 h-5" />
                  </ListItemPrefix>
                  Hapus Akun
                  <ListItemSuffix placeholder={""}>
                    <ChevronRightIcon className="w-4 h-4" />
                  </ListItemSuffix>
                </ListItem>
              </Link>
            </List>
          </Card>
        </div>
      </div>
    </main>
  );
};

export default Profile;

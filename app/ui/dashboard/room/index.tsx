"use client";

import TableRooms from "@/app/ui/dashboard/room/table-rooms";
import type { RoomType } from "@/types";
import { PlusIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

type Props = {
  rooms: RoomType[];
  guestRooms: RoomType[] | null;
};

const Room = ({ rooms, guestRooms }: Props) => {
  const router = useRouter();
  useEffect(() => {
    console.log("rooms", rooms);
  }, []);

  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-8">
          <h1 className="text-2xl me-auto font-semibold text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            My Rooms
          </h1>

          <Link href={"/dashboard/room/new"}>
            <IconButton
              size="sm"
              placeholder={""}
              variant="filled"
              color="indigo"
              className="md:hidden"
            >
              <PlusIcon className="w-4 h-4" />
            </IconButton>
            <Button
              size="sm"
              className="md:flex hidden items-center gap-2"
              placeholder={""}
              color="indigo"
            >
              <PlusIcon className="w-4 h-4" strokeWidth={3} />
              Add Room
            </Button>
          </Link>
        </div>

        <Tabs value="A">
          <TabsHeader
            placeholder={""}
            indicatorProps={{
              className: "",
            }}
            className="w-full  md:w-80 !shadow-sm"
          >
            <Tab value={"A"} placeholder={""} defaultChecked>
              Milik Saya
            </Tab>
            <Tab value={"B"} placeholder={""}>
              Sebagai Tamu
            </Tab>
          </TabsHeader>
          <TabsBody placeholder={""} className="">
            <TabPanel value={"A"} className="px-0">
              <TableRooms rooms={rooms} />
            </TabPanel>
            <TabPanel value={"B"} className="px-0">
              <TableRooms rooms={guestRooms || []} guest />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </main>
  );
};

export default Room;

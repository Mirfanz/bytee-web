"use client";

import { useSession } from "@/app/session-provider";
import TableRooms from "@/app/ui/dashboard/room/table-rooms";
import type { RoomType } from "@/types";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
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
import React, { useEffect, useState } from "react";
import AddRoomModal from "../../modals/add-room";

type Props = {
  rooms: RoomType[] | undefined;
  guestRooms: RoomType[] | undefined;
};

const Room = ({ rooms, guestRooms }: Props) => {
  const router = useRouter();

  const [dialogAddRoom, setDialogAddRoom] = useState<boolean>(false);

  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-2 mb-8">
          <h1 className="text-2xl me-auto font-semibold text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            My Rooms
          </h1>

          <IconButton
            placeholder={""}
            variant="filled"
            color="indigo"
            className="md:hidden"
            size="sm"
            onClick={() => setDialogAddRoom(true)}
          >
            <PlusIcon className="w-5 h-5" />
          </IconButton>
          <Button
            onClick={() => setDialogAddRoom(true)}
            className="md:flex hidden items-center gap-3"
            placeholder={""}
            size="sm"
            color="indigo"
          >
            <PlusIcon className="w-4 h-4" strokeWidth={3} />
            Add Room
          </Button>
          <IconButton
            placeholder={""}
            variant="filled"
            color="indigo"
            size="sm"
            onClick={router.refresh}
          >
            <ArrowPathIcon className="w-5 h-5" />
          </IconButton>
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
              <TableRooms rooms={guestRooms} guest />
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
      <AddRoomModal
        isOpen={dialogAddRoom}
        onClose={() => setDialogAddRoom(false)}
      />
    </main>
  );
};

export default Room;

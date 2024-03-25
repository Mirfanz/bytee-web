"use client";

import type { RoomType } from "@/types";
import {
  ArrowPathIcon,
  PlusIcon,
  RectangleGroupIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import {
  Button,
  Card,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
} from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import AddRoomModal from "../../modals/add-room";
import ErrorComponent from "../../error";

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
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 justify-center items-start">
          <Card placeholder={""} className="w-full p-4">
            <h5 className="underline font-medium underline-offset-8 mb-5">
              Milik Saya
            </h5>
            {rooms?.length ? (
              <List placeholder={""} className="gap-2 p-0">
                {rooms?.map((room, index) => (
                  <Link
                    href={`/dashboard/room/${room.id}`}
                    key={"rooms" + index}
                  >
                    <ListItem placeholder={""} className="bg-blue-gray-50">
                      {room.name}
                      <ListItemSuffix
                        placeholder={""}
                        className="flex-row flex gap-1 "
                      >
                        <Chip
                          value={room.devices.length}
                          size="sm"
                          variant="ghost"
                          color="indigo"
                          icon={<RectangleGroupIcon className="w-4 h-4" />}
                        />
                        <Chip
                          value={room.guests.length}
                          size="sm"
                          variant="ghost"
                          color="indigo"
                          icon={<UserGroupIcon className="w-4 h-4" />}
                        />
                      </ListItemSuffix>
                    </ListItem>
                  </Link>
                ))}
              </List>
            ) : (
              <ErrorComponent message="Belum memiliki room" status="warning" />
            )}
          </Card>
          <Card placeholder={""} className="w-full p-4">
            <h5 className="underline font-medium underline-offset-8 mb-5">
              Sebagai Tamu
            </h5>
            {guestRooms?.length ? (
              <List placeholder={""} className="gap-2 p-0">
                {guestRooms?.map((room, index) => (
                  <Link
                    href={`/dashboard/room/${room.id}`}
                    key={"guestrooms" + index}
                  >
                    <ListItem placeholder={""} className="bg-blue-gray-50">
                      {room.name}
                      <ListItemSuffix
                        placeholder={""}
                        className="flex-row flex gap-1 "
                      >
                        <Chip
                          value={room.devices.length}
                          size="sm"
                          variant="ghost"
                          color="indigo"
                          icon={<RectangleGroupIcon className="w-4 h-4" />}
                        />
                        <Chip
                          value={room.guests.length}
                          size="sm"
                          variant="ghost"
                          color="indigo"
                          icon={<UserGroupIcon className="w-4 h-4" />}
                        />
                      </ListItemSuffix>
                    </ListItem>
                  </Link>
                ))}
              </List>
            ) : (
              <ErrorComponent message="Tidak ada room" status="warning" />
            )}
          </Card>
        </div>
      </div>
      <AddRoomModal
        isOpen={dialogAddRoom}
        onClose={() => setDialogAddRoom(false)}
      />
    </main>
  );
};

export default Room;

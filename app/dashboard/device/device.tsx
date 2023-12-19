"use client";

import TableDevices from "@/app/ui/table-devices";
import TableRooms from "@/app/ui/table-rooms";
import { ArrowPathIcon, PlusIcon } from "@heroicons/react/24/outline";
import { Button, IconButton, Typography } from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {
  devices: Prisma.DeviceGetPayload<{ include: { room: true } }>[];
};

const Device = ({ devices }: Props) => {
  const router = useRouter();
  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <Typography
            placeholder={""}
            className="text-2xl me-auto font-bold text-gray-900 !border-s-4 border-indigo-700 ps-2 "
          >
            My Devices
          </Typography>
          <IconButton
            placeholder={""}
            size="sm"
            variant="outlined"
            color="indigo"
            onClick={() => router.refresh()}
          >
            <ArrowPathIcon className="w-5 h-5" />
          </IconButton>
          <IconButton
            size="sm"
            placeholder={""}
            variant="filled"
            color="indigo"
            className="md:hidden"
            onClick={() => router.push("new")}
          >
            <PlusIcon className="w-4 h-4" />
          </IconButton>
          <Button
            size="sm"
            className="md:flex hidden items-center gap-2"
            placeholder={""}
            color="indigo"
            onClick={() => router.push("/dashboard/device/new")}
          >
            <PlusIcon className="w-4 h-4" strokeWidth={3} />
            Add Device
          </Button>
        </div>
        <TableDevices devices={devices} />
      </div>
    </main>
  );
};

export default Device;

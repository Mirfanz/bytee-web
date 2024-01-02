"use client";

import React from "react";
import { Alert, Button, IconButton } from "@material-tailwind/react";
import {
  ArrowLeftOnRectangleIcon,
  ArrowPathIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import CardDevice from "./card-device";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";

type Props = {
  rooms: Prisma.RoomGetPayload<{ include: { devices: true } }>[] | null;
};

const Dashboard = ({ rooms }: Props) => {
  const router = useRouter();
  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl me-auto font-semibold text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            Dashboard
          </h1>
          <Button
            size="sm"
            variant="outlined"
            className="flex items-center gap-2"
            placeholder={""}
            color="indigo"
          >
            <ArrowPathIcon className="w-4 h-4" />
            Refresh
          </Button>
        </div>
        {rooms ? (
          rooms.map((room) => (
            <div key={room.id} className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2 ">
                  <ArrowLeftOnRectangleIcon
                    strokeWidth={2}
                    className="w-5 h-5"
                  />
                  {room.name}
                </h3>
                <IconButton
                  placeholder={""}
                  variant="text"
                  size="sm"
                  color="indigo"
                >
                  <EllipsisVerticalIcon strokeWidth={3} className="w-4 h-4" />
                </IconButton>
              </div>
              {room.devices?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {room.devices.map((device) => (
                    <CardDevice key={device.id} device={device} />
                  ))}
                </div>
              ) : (
                <Alert
                  color="indigo"
                  variant="outlined"
                  icon={<ExclamationTriangleIcon className="w-6 h-6" />}
                >
                  Nothing device in this room
                </Alert>
              )}
            </div>
          ))
        ) : (
          <Alert
            color="indigo"
            variant="outlined"
            icon={<ExclamationTriangleIcon className="w-6 h-6" />}
          >
            You dont have any room
          </Alert>
        )}
      </div>
    </main>
  );
};

export default Dashboard;

"use client";

import React from "react";
import {
  Alert,
  Button,
  IconButton,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowPathIcon,
  ArrowTopRightOnSquareIcon,
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
          <Typography
            placeholder={""}
            className="text-2xl me-auto font-bold text-gray-900 !border-s-4 border-indigo-700 ps-2 "
          >
            Dashboard
          </Typography>
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
            <div key={room.id} className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <Typography
                  placeholder={""}
                  className="font-semibold flex items-center gap-1 "
                >
                  <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                  {room.name}
                </Typography>
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
                  {room.devices.map((device) =>
                    [device.relay1, device.relay2].map(
                      (relay, id) =>
                        relay?.name && (
                          <CardDevice
                            key={device.id + "relay" + id}
                            relay={relay}
                            device={{
                              id: device.id,
                              name: device.name,
                            }}
                            relayId={id + 1}
                          />
                        )
                    )
                  )}
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

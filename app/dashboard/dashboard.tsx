"use client";

import React from "react";
import {
  Alert,
  Breadcrumbs,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  IconButton,
  Switch,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import {
  ArrowTopRightOnSquareIcon,
  ChevronDoubleDownIcon,
  ChevronDownIcon,
  EllipsisVerticalIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import { Prisma } from "@prisma/client";
import CardDevice from "../ui/dashboard/card-device";

type Props = {
  rooms: Prisma.RoomGetPayload<{ include: { devices: true } }>[] | null;
};
const fakeData = [
  {
    id: "65815c0827de4b0c0b200bde",
    name: "Jarwo",
    description: "Produk pertama beli",
    userId: "65804e4a841d0793c6de4469",
    roomId: "65805d7bf45f78f2b427fafb",
    createdAt: { $date: { $numberLong: "1702976520585" } },
    relay1: { status: false },
    relay2: { status: false },
  },
  {
    id: "65815c0827de4b0c0b200bde",
    name: "Jarwo",
    description: "Produk pertama beli",
    userId: "65804e4a841d0793c6de4469",
    roomId: "65805d7bf45f78f2b427fafb",
    createdAt: { $date: { $numberLong: "1702976520585" } },
    relay1: { status: false },
    relay2: { status: false },
  },
  {
    id: "65815c0827de4b0c0b200bde",
    name: "Jarwo",
    description: "Produk pertama beli",
    userId: "65804e4a841d0793c6de4469",
    roomId: "65805d7bf45f78f2b427fafb",
    createdAt: { $date: { $numberLong: "1702976520585" } },
    relay1: { status: false },
    relay2: { status: false },
  },
  {
    id: "65815c0827de4b0c0b200bde",
    name: "Jarwo",
    description: "Produk pertama beli",
    userId: "65804e4a841d0793c6de4469",
    roomId: "65805d7bf45f78f2b427fafb",
    createdAt: { $date: { $numberLong: "1702976520585" } },
    relay1: { status: false },
    relay2: { status: false },
  },
  {
    id: "65815c0827de4b0c0b200bde",
    name: "Jarwo",
    description: "Produk pertama beli",
    userId: "65804e4a841d0793c6de4469",
    roomId: "65805d7bf45f78f2b427fafb",
    createdAt: { $date: { $numberLong: "1702976520585" } },
    relay1: { status: false },
    relay2: { status: false },
  },
];

const Dashboard = ({ rooms }: Props) => {
  return (
    <main>
      <div className="container py-4 lg:!p-8">
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
                  {room.devices.map((device) => (
                    <>
                      <CardDevice
                        relay={device.relay1}
                        deviceName={device.name || "No Name"}
                      />
                      <CardDevice
                        relay={device.relay2}
                        deviceName={device.name || "No Name"}
                      />
                    </>
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

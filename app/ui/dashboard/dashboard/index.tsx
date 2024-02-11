"use client";

import React, { useEffect } from "react";
import { Alert, Button, ButtonGroup } from "@material-tailwind/react";
import {
  ArrowLeftOnRectangleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import CardDevice from "./card-device";
import { useRouter } from "next/navigation";
import { io } from "socket.io-client";
import type { RoomType } from "@/types";

type Props = {
  rooms: RoomType[] | null;
  guestRooms: RoomType[] | null;
};

const Dashboard = ({ rooms, guestRooms }: Props) => {
  const [connectStatus, setConnectStatus] = React.useState<boolean>(false);
  const socket = io(":8083", {
    port: 8083,
    secure: false,
  });

  useEffect(() => {
    setConnectStatus(socket.connected || false);
    socket.on("connect", () => {
      setConnectStatus(socket.connected);
    });
    socket.on("connect_error", (err) => {
      setConnectStatus(socket.connected);
    });
    socket.on("error", (err) => {
      console.error("Connection error: ", err);
      setConnectStatus(socket.connected);
      socket.close();
    });
    socket.on("reconnect", () => {
      setConnectStatus(socket.connected);
    });
    socket.on("disconnect", () => {
      setConnectStatus(socket.connected);
    });
  }, []);

  const router = useRouter();
  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl me-auto font-semibold text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            Dashboard
          </h1>
          <Button
            placeholder={""}
            color={connectStatus ? "green" : "red"}
            size="sm"
            variant="gradient"
          >
            {connectStatus ? "Connected" : "Disconnected"}
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
                <ButtonGroup
                  placeholder={""}
                  size="sm"
                  variant="outlined"
                  color="indigo"
                >
                  <Button
                    placeholder={""}
                    onClick={() => {
                      room.devices.map((device) => {
                        socket.emit("publish", {
                          deviceId: device.id,
                          state: false,
                        });
                      });
                    }}
                  >
                    OFF
                  </Button>
                  <Button
                    placeholder={""}
                    onClick={() => {
                      room.devices.map((device) => {
                        socket.emit("publish", {
                          deviceId: device.id,
                          state: true,
                        });
                      });
                    }}
                  >
                    ON
                  </Button>
                </ButtonGroup>
              </div>
              {room.devices?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {room.devices.map((device) => (
                    <CardDevice
                      key={device.id}
                      socket={socket}
                      device={device}
                    />
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
            Terjadi kesalahan saat mengambil data room
          </Alert>
        )}
        <div>
          {guestRooms?.map((room) => (
            <div key={room.id} className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2 ">
                  <ArrowLeftOnRectangleIcon
                    strokeWidth={2}
                    className="w-5 h-5"
                  />
                  {room.name}
                </h3>
                <ButtonGroup
                  placeholder={""}
                  size="sm"
                  variant="outlined"
                  color="indigo"
                >
                  <Button
                    placeholder={""}
                    onClick={() => {
                      room.devices.map((device) => {
                        socket.emit("publish", {
                          deviceId: device.id,
                          state: false,
                        });
                      });
                    }}
                  >
                    OFF
                  </Button>
                  <Button
                    placeholder={""}
                    onClick={() => {
                      room.devices.map((device) => {
                        socket.emit("publish", {
                          deviceId: device.id,
                          state: true,
                        });
                      });
                    }}
                  >
                    ON
                  </Button>
                </ButtonGroup>
              </div>
              {room.devices?.length ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {room.devices.map((device) => (
                    <CardDevice
                      key={device.id}
                      socket={socket}
                      device={device}
                    />
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
          ))}
        </div>
      </div>
    </main>
  );
};

export default Dashboard;

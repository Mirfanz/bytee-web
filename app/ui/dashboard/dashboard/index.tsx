"use client";

import React, { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup } from "@material-tailwind/react";
import {
  ArrowLeftOnRectangleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";
import CardDevice from "./card-device";
import { useRouter } from "next/navigation";
import type { RoomType } from "@/types";
import MQTT from "mqtt";

type Props = {
  rooms: RoomType[] | null;
  guestRooms: RoomType[] | null;
};

const Dashboard = ({ rooms, guestRooms }: Props) => {
  const [connectStatus, setConnectStatus] = React.useState<boolean>(false);
  const [mqtt, setMqtt] = useState<MQTT.MqttClient>(
    MQTT.connect({
      port: 8083,
      protocol: "ws",
    })
  );
  function getTopic(deviceId: string): string {
    return `bytee/device/${deviceId}/state`;
  }

  useEffect(() => {
    mqtt?.on("connect", (packet) => {
      console.log("packet", packet);
      setConnectStatus(true);
    });
    mqtt?.on("error", (error) => {
      console.log("MQTT Error", error);
    });
    mqtt?.on("disconnect", (packet) => {
      setConnectStatus(false);
    });
    mqtt?.on("reconnect", () => {
      setConnectStatus(false);
    });
    // return () => {
    //   mqtt?.end();
    // };
  }, [mqtt]);

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
                        mqtt?.publish(getTopic(device.id), "0");
                      });
                    }}
                  >
                    OFF
                  </Button>
                  <Button
                    placeholder={""}
                    onClick={() => {
                      room.devices.map((device) => {
                        mqtt?.publish(getTopic(device.id), "1");
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
                      mqtt={mqtt}
                      device={device}
                      connectStatus={connectStatus}
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
                        mqtt?.publish(getTopic(device.id), "0");
                      });
                    }}
                  >
                    OFF
                  </Button>
                  <Button
                    placeholder={""}
                    onClick={() => {
                      room.devices.map((device) => {
                        mqtt?.publish(getTopic(device.id), "1");
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
                      mqtt={mqtt}
                      device={device}
                      connectStatus={connectStatus}
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

"use client";

import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  ButtonGroup,
  IconButton,
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader,
} from "@material-tailwind/react";
import {
  ArrowLeftOnRectangleIcon,
  CubeTransparentIcon,
  ExclamationTriangleIcon,
  PowerIcon,
} from "@heroicons/react/24/outline";
import CardDevice from "./card-device";
import { useRouter } from "next/navigation";
import type { RoomType } from "@/types";
import MQTT from "mqtt";
import { FetchRooms } from "@/lib/actions";
import ErrorComponent from "@/app/ui/error";
import { useSession } from "@/app/session-provider";

type Props = {};

const Dashboard = ({}: Props) => {
  const session = useSession();
  const [connectStatus, setConnectStatus] = React.useState<boolean>(false);
  const [rooms, setRooms] = useState<RoomType[] | undefined>([]);
  const [guestRooms, setGuestRooms] = useState<RoomType[] | undefined>([]);
  const [mqtt, setMqtt] = useState<MQTT.MqttClient>();
  function getTopic(deviceId: string): string {
    return `bytee/device/${deviceId}/state`;
  }

  useEffect(() => {
    FetchRooms({ asGuest: false })
      .then((result) => setRooms(result.error ? undefined : result.data))
      .catch(() => setRooms(undefined));
    FetchRooms({ asGuest: true })
      .then((result) => setGuestRooms(result.error ? undefined : result.data))
      .catch(() => setGuestRooms(undefined));
  }, []);

  useEffect(() => {
    if (!mqtt)
      setMqtt(
        MQTT.connect({
          port: 443,
          hostname: "mqtt.bytee.cloud/ws",
          protocol: "wss",
        })
      );
    else {
      mqtt.on("connect", (packet) => {
        console.log("packet", packet);
        setConnectStatus(true);
      });
      mqtt.on("error", (error) => {
        console.log("MQTT Error", error);
      });
      mqtt.on("disconnect", (packet) => {
        setConnectStatus(false);
      });
      mqtt.on("reconnect", () => {
        setConnectStatus(false);
      });
    }
    // return () => {
    //   mqtt.end();
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

        <Tabs value="my-rooms">
          <TabsHeader placeholder={""} className="md:max-w-xs">
            <Tab placeholder={""} value={"my-rooms"}>
              My Rooms
            </Tab>
            <Tab placeholder={""} value={"guest-rooms"}>
              Guest Rooms
            </Tab>
          </TabsHeader>

          <TabsBody placeholder={""}>
            <TabPanel value={"my-rooms"}>
              {rooms ? (
                rooms.map((room) => (
                  <div key={room.id} className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2 ">
                        <CubeTransparentIcon
                          strokeWidth={2}
                          className="w-5 h-5"
                        />
                        {room.name}
                      </h3>
                      <div className="flex">
                        <IconButton
                          placeholder={""}
                          size="sm"
                          color="deep-orange"
                          variant="filled"
                          className="rounded-e-none"
                          title="Matikan Semua"
                          onClick={() => {
                            room.devices.map((device) => {
                              mqtt?.publish(getTopic(device.id), "0");
                            });
                          }}
                        >
                          <PowerIcon strokeWidth={2.5} className="w-4 h-4 " />
                        </IconButton>
                        <IconButton
                          title="Nyalakan Semua"
                          placeholder={""}
                          size="sm"
                          color="teal"
                          variant="filled"
                          className="rounded-s-none"
                          onClick={() => {
                            room.devices.map((device) => {
                              mqtt?.publish(getTopic(device.id), "1");
                            });
                          }}
                        >
                          <PowerIcon strokeWidth={2.5} className="w-4 h-4" />
                        </IconButton>
                      </div>
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
                      <ErrorComponent
                        status="warning"
                        message="Tidak ada device"
                      />
                    )}
                  </div>
                ))
              ) : (
                <ErrorComponent
                  status="error"
                  message="Gagal mengambil data rooms"
                />
              )}
            </TabPanel>
            <TabPanel value={"guest-rooms"}>
              <div>
                {guestRooms?.map((room) => (
                  <div key={room.id} className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-lg text-gray-800 flex items-center gap-2 ">
                        <CubeTransparentIcon
                          strokeWidth={2}
                          className="w-5 h-5"
                        />
                        {room.name}
                      </h3>
                      <h6 className="me-auto ms-2 text-sm">
                        [ {room.user.name} ]
                      </h6>
                      <div className="flex">
                        <IconButton
                          placeholder={""}
                          size="sm"
                          color="deep-orange"
                          variant="filled"
                          className="rounded-e-none"
                          title="Matikan Semua"
                          onClick={() => {
                            room.devices.map((device) => {
                              mqtt?.publish(getTopic(device.id), "0");
                            });
                          }}
                        >
                          <PowerIcon strokeWidth={2.5} className="w-4 h-4 " />
                        </IconButton>
                        <IconButton
                          title="Nyalakan Semua"
                          placeholder={""}
                          size="sm"
                          color="teal"
                          variant="filled"
                          className="rounded-s-none"
                          onClick={() => {
                            room.devices.map((device) => {
                              mqtt?.publish(getTopic(device.id), "1");
                            });
                          }}
                        >
                          <PowerIcon strokeWidth={2.5} className="w-4 h-4" />
                        </IconButton>
                      </div>
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
                      <ErrorComponent
                        status="warning"
                        message="Tidak ada device"
                      />
                    )}
                  </div>
                ))}
              </div>
            </TabPanel>
          </TabsBody>
        </Tabs>
      </div>
    </main>
  );
};

export default Dashboard;

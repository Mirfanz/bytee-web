"use client";

import type { DeviceType, PublishProps, SubscribeProps } from "@/types";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Card } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

type Props = {
  device: DeviceType;
  socket: Socket | null;
};

const CardDevice = ({ device, socket }: Props) => {
  const [status, setStatus] = useState<boolean>(device.state);
  const [switching, setSwitching] = useState<boolean>(false);

  function subscribe(deviceId: SubscribeProps) {
    return socket?.emit("subscribe", deviceId);
  }
  function publish(data: PublishProps) {
    return socket?.emit("publish", data);
  }

  useEffect(() => {
    socket?.on("connect", () => {
      subscribe(device.id);
    });
    socket?.on("mqtt_message", (data: PublishProps) => {
      if (data.deviceId === device.id) setStatus(data.state);
    });
  }, [socket]);

  async function handleSwithBtn() {
    if (switching) return;
    setSwitching(true);
    const newStatus = !status;
    publish({ deviceId: device.id, state: newStatus });

    setStatus(newStatus);
    setSwitching(false);
  }

  return (
    <Card
      className="lg:hover:brightness-95 overflow-hidden duration-300"
      placeholder={""}
    >
      {/* <CardBody className="p-3" placeholder={""}> */}
      {/* <IconButton
          placeholder={""}
          variant="outlined"
          color="indigo"
          size="sm"
        >
          <RectangleStackIcon className="h-5 w-5" />
        </IconButton> */}
      <h5 className="text-sm bg-blue-gray-50 font-medium py-3 text-gray-900 text-center">
        {device.name}
      </h5>
      <hr />
      <div className="select-none flex py-8 items-center justify-center ">
        <div
          className="w-28 h-10 bg-white relative border-1 flex items-center  rounded-md p-1 "
          style={{
            boxShadow: "3px 3px 7px #d4d4d4,-3px -3px 7px #ffffff",
          }}
        >
          <button
            className={`!w-12 h-8 z-10 duration-100 absolute shadow-none bg-gray-300 rounded flex justify-center items-center hover:brightness-95 ${
              status ? "left-14 translate-x-1" : "left-1"
            }`}
            onClick={handleSwithBtn}
            disabled={switching}
          >
            <PowerIcon
              className="w-4 h-4 !duration-100"
              strokeWidth={2}
              color={status ? "green" : "red"}
            />
          </button>
          <p className="flex w-full text-gray-700 text-sm">
            <span className="w-full text-center">ON</span>
            <span className="w-full text-center">OFF</span>
          </p>
        </div>
      </div>
      {/* </CardBody> */}
    </Card>
  );
};

export default CardDevice;

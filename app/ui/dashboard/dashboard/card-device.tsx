"use client";

import type { DeviceType } from "@/types";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Card, Spinner } from "@material-tailwind/react";
import { MqttClient } from "mqtt";
import React, { useEffect, useState } from "react";

type Props = {
  device: DeviceType;
  mqtt: MqttClient | undefined;
  connectStatus?: boolean;
};

const CardDevice = ({ device, mqtt, connectStatus }: Props) => {
  const topics = {
    device: `bytee/device/${device.id}/state`,
    web: `bytee/web/${device.id}/state`,
  };
  const [status, setStatus] = useState<boolean>(device.state);
  const [switching, setSwitching] = useState<boolean>(true);

  useEffect(() => {
    mqtt?.on("connect", () => {
      mqtt.subscribe(topics.web);
      mqtt.publish(topics.device, "3");
    });
    mqtt?.on("message", (topic, payload, packet) => {
      if (topic != topics.web) return;
      const message = payload.toString();
      if (message === "0") setStatus(false);
      else if (message === "1") setStatus(true);
      setSwitching(false);
    });
  }, [mqtt]);

  async function handleSwithBtn() {
    if (switching) return;
    setSwitching(true);

    if (!status) mqtt?.publish(topics.device, "1");
    else mqtt?.publish(topics.device, "0");
  }

  return (
    <Card
      className="lg:hover:brightness-95 overflow-hidden duration-300"
      placeholder={""}
    >
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
            {switching ? (
              <Spinner className="w-4 h-4" color="indigo" />
            ) : (
              <PowerIcon
                className="w-4 h-4 !duration-100"
                strokeWidth={2}
                color={status ? "green" : "red"}
              />
            )}
          </button>
          <p className="flex w-full text-gray-700 text-sm">
            <span className="w-full text-center">ON</span>
            <span className="w-full text-center">OFF</span>
          </p>
        </div>
      </div>
    </Card>
  );
};

export default CardDevice;

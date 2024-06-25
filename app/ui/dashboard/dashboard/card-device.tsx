"use client";

import type { DeviceType } from "@/types";
import { PowerIcon } from "@heroicons/react/24/solid";
import { Card, Spinner } from "@material-tailwind/react";
import { MqttClient } from "mqtt";
import React, { useEffect, useState } from "react";

type Props = {
  device: DeviceType;
  mqtt?: MqttClient;
  connectStatus?: boolean;
};

const CardDevice = ({ device, mqtt, connectStatus }: Props) => {
  const [active, setActive] = useState<boolean>(false);
  const [info, setInfo] = useState<string | null>(null);
  const [state, setState] = useState<boolean>(device.state);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    mqtt?.subscribe("bytee/web/" + device.id + "/state", (error) => {
      if (error) return console.log(`Subscribe Failed ${device.name}`);
      mqtt.publish("bytee/device/" + device.id + "/state", "2");
    });

    mqtt?.on("message", (topic, payload, packet) => {
      if (topic != "bytee/web/" + device.id + "/state") return;
      console.log("New Message");
      const message = payload.toString();
      console.log("message", message);
      switch (parseInt(message)) {
        case 0:
          setState(false);
          break;
        case 1:
          setState(true);
          break;
      }
      setLoading(false);
      setActive(true);
    });
  }, [mqtt]);

  async function handleSwithBtn() {
    if (loading) return;
    setLoading(true);

    mqtt?.publish(
      "bytee/device/" + device.id + "/state",
      !state ? "1" : "0",
      (error, packet) => {
        // setLoading(false);
        if (!error) setState((prev) => !prev);
      }
    );
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
        {active ? (
          <div
            className="w-28 h-10 bg-white relative border-1 flex items-center  rounded-md p-1 "
            style={{
              boxShadow: "3px 3px 7px #d4d4d4,-3px -3px 7px #ffffff",
            }}
          >
            <button
              className={`!w-12 h-8 z-10 duration-100 absolute shadow-none bg-gray-300 rounded flex justify-center items-center hover:brightness-95 ${
                state ? "left-14 translate-x-1" : "left-1"
              }`}
              onClick={handleSwithBtn}
              disabled={loading}
            >
              {loading ? (
                <Spinner className="w-4 h-4" color="indigo" />
              ) : (
                <PowerIcon
                  className="w-4 h-4 !duration-100"
                  strokeWidth={2}
                  color={state ? "green" : "red"}
                />
              )}
            </button>
            <p className="flex w-full text-gray-700 text-sm">
              <span className="w-full text-center">ON</span>
              <span className="w-full text-center">OFF</span>
            </p>
          </div>
        ) : (
          <div className="w-28 h-10 flex items-center justify-center text-blue-gray-300">
            Offline
          </div>
        )}
      </div>
    </Card>
  );
};

export default CardDevice;

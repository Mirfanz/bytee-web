"use client";

import { LightBulbIcon, PowerIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  IconButton,
  Switch,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

type Props = {
  relay: {
    name: string | null;
    status: boolean;
  };
  deviceName: string;
  relayId: "relay1" | "relay2";
};

const CardDevice = ({ relay, deviceName, relayId }: Props) => {
  const [status, setStatus] = useState<boolean>(relay.status);
  return (
    <Card className="lg:hover:brightness-95 duration-300" placeholder={""}>
      <CardBody className="p-3" placeholder={""}>
        <div className="flex gap-2 items-center">
          <IconButton
            placeholder={""}
            variant="outlined"
            color="indigo"
            size="sm"
          >
            <LightBulbIcon className="h-5 w-5" />
          </IconButton>
          <div className="flex flex-col">
            <Typography className="text-base text-gray-900" placeholder={""}>
              {relay.name}
            </Typography>
            <Typography
              placeholder={""}
              variant="small"
              className="text-xs -mt-1 text-gray-500 line-clamp-1"
            >
              {deviceName} | {relayId}
            </Typography>
          </div>
        </div>
        <div className="select-none flex py-8 items-center justify-center ">
          <div
            className="bg-white border-1 flex items-center  rounded-md p-1 w-28"
            style={{
              boxShadow: "3px 3px 7px #d4d4d4,-3px -3px 7px #ffffff",
            }}
          >
            <button
              className={`!w-12 h-8 shadow-none bg-gray-300 rounded flex justify-center items-center hover:brightness-95 ${
                status ? "order-1" : "order-none"
              }`}
              onClick={() => setStatus(!status)}
            >
              <PowerIcon
                className="w-4 h-4 !duration-300"
                strokeWidth={2}
                color={status ? "green" : "red"}
              />
            </button>
            <Typography
              placeholder={""}
              className="mx-auto text-sm text-gray-700"
            >
              {status ? "ON" : "OFF"}
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardDevice;

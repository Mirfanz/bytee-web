"use client";

import { LightBulbIcon } from "@heroicons/react/24/outline";
import {
  Card,
  CardBody,
  IconButton,
  Switch,
  Typography,
} from "@material-tailwind/react";
import React from "react";

type Props = {
  relay: {
    name: string | null;
    status: boolean;
  };
  deviceName: string;
};

const CardDevice = ({ relay, deviceName }: Props) => {
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
              {relay.name || "Relay"}
            </Typography>
            <Typography
              placeholder={""}
              variant="small"
              className="text-xs -mt-1 text-gray-500"
            >
              {deviceName}
            </Typography>
          </div>
        </div>
        <div className="flex py-8 items-center justify-center ">
          {/* <button className="p-4 hover:brightness-95 hover:scale-110 duration-100">
                    <PowerIcon
                    color={item.relay1.status ? "green" : "red"}
                    className="h-10 w-10"
                    />
                  </button> */}
          <Switch crossOrigin={true} color="green" className="" />
        </div>
        <Typography
          placeholder={""}
          className="text-xs absolute bottom-2 left-2 text-gray-500"
        >
          Online
        </Typography>
      </CardBody>
    </Card>
  );
};

export default CardDevice;

"use client";

import { UpdateRelay } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { PowerIcon, RectangleStackIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardBody,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

type Props = {
  relay: {
    name: string | null;
    status: boolean;
  };
  relayId: number;
  device: {
    id: string;
    name: string;
  };
};

const CardDevice = ({ relay, device, relayId }: Props) => {
  const [status, setStatus] = useState<boolean>(relay.status);
  const [switching, setSwitching] = useState<boolean>(false);

  async function handleSwithBtn() {
    if (switching) return;
    setSwitching(true);
    UpdateRelay({
      deviceId: device.id,
      relayId,
      status: !status,
      relayName: relay.name || "",
    })
      .then((result) => {
        if (result.error) throw new Error("Aksi gagal");
        // @ts-ignore
        setStatus(result.data?.status);
        Toast.fire({
          text: result.succes,
          timer: 1000,
        });
      })
      .catch((error) => {
        Toast.fire({
          text: error.message,
          timer: 1000,
        });
      })
      .finally(() => setSwitching(false));
  }

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
            <RectangleStackIcon className="h-5 w-5" />
          </IconButton>
          <div className="flex flex-col">
            <Typography className="text-base text-gray-900" placeholder={""}>
              {relay.name}
            </Typography>
            <Typography
              placeholder={""}
              variant="small"
              className="text-xs -mt-1 text-gray-600 line-clamp-1"
            >
              {device.name}
            </Typography>
          </div>
        </div>
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
            <Typography
              className="flex w-full text-gray-700 text-sm"
              placeholder={""}
            >
              <span className="w-full text-center">ON</span>
              <span className="w-full text-center">OFF</span>
            </Typography>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default CardDevice;

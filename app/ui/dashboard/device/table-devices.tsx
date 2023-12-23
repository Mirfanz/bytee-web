"use client";
import { DeleteDevice } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import {
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PowerIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Badge,
  Card,
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import React from "react";
import Swal from "sweetalert2";

const TABLE_HEAD = ["Name", "Description", "Relay.1", "Relay.2", "Room", ""];

const TableRow = ({
  device,
}: {
  device: Prisma.DeviceGetPayload<{ include: { room: true } }>;
}) => {
  const [deleting, setDeleting] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  async function handleDeleteDevice(deviceId: string) {
    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      titleText: "Hapus Device?",
      text: "Device ini akan dihapus dan tidak dapat dipulihkan kembali.",
      confirmButtonText: "Ya, Hapus",
      showCancelButton: true,
      cancelButtonText: "Jangan Deh",
      focusConfirm: false,
      focusCancel: true,
    });
    if (!isConfirmed) return;

    setDeleting(true);
    DeleteDevice(deviceId)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        Toast.fire({
          icon: "success",
          text: data.success,
        });
        setDeleted(true);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          text: "Gagal dihapus",
        });
      })
      .finally(() => setDeleting(false));
  }
  if (deleted) return;
  return (
    <tr className="text-sm border-b text-blue-gray-900 border-gray-400 hover:bg-blue-gray-50/50">
      <td className="p-4">
        <div className="">
          {device.name || "-"} <br />
          <small className="text-gray-600">ID: {device.id}</small>
        </div>
      </td>
      <td className="p-4">
        {device.description || <i className="text-gray-600">( Kosyong )</i>}
      </td>
      <td className="p-4">
        {device.relay1 ? (
          <div className=" flex gap-1 items-center">
            <PowerIcon
              strokeWidth={3}
              color={device.relay1.status ? "darkgreen" : "red"}
              className="h-4 w-4"
            />
            {device.relay1.name || "R.1"}
          </div>
        ) : (
          "-"
        )}
      </td>
      <td className="p-4">
        {device.relay2 ? (
          <div className=" flex gap-1 items-center">
            <PowerIcon
              strokeWidth={3}
              color={device.relay2.status ? "darkgreen" : "red"}
              className="h-4 w-4"
            />
            {device.relay2.name || "R.2"}
          </div>
        ) : (
          "-"
        )}
      </td>
      <td className="p-4">{device.room.name}</td>
      <td className="p-4 w-12">
        <Menu placement="left-start">
          <MenuHandler>
            <IconButton
              placeholder={""}
              size="sm"
              variant="text"
              color="indigo"
            >
              <EllipsisVerticalIcon className="w-5 h-5" />
            </IconButton>
          </MenuHandler>
          <MenuList placeholder={""} className="min-w-0">
            <MenuItem placeholder={""}>
              <div className="flex items-center gap-2">
                <PencilSquareIcon className="w-4 h-4" />
                Edit
              </div>
            </MenuItem>
            <MenuItem placeholder={""} disabled={deleting}>
              <div
                onClick={() => handleDeleteDevice(device.id)}
                className="flex items-center gap-2"
              >
                <TrashIcon className="w-4 h-4" />
                Delete
              </div>
            </MenuItem>
          </MenuList>
        </Menu>
      </td>
    </tr>
  );
};

const TableDevices = ({
  devices,
}: {
  devices: Prisma.DeviceGetPayload<{ include: { room: true } }>[];
}) => {
  return (
    <div className="h-full w-full overflow-auto shadow-none rounded  border border-gray-400">
      <table className="w-full min-w-max  text-left ">
        <thead>
          <tr className=" text-sm border-b border-gray-400">
            {TABLE_HEAD.map((head) => (
              <th className="p-4" key={head}>
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {devices.map((device, index) => (
            <TableRow key={device.id} device={device} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableDevices;

"use client";

import { DeleteRoom } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import {
  Cog6ToothIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  IconButton,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import Swal from "sweetalert2";

const TABLE_HEAD = ["Name", "Description", "Home", ""];

const TableRow = ({
  room,
}: {
  room: Prisma.RoomGetPayload<{ include: { devices: true } }>;
}) => {
  const [deleting, setDeleting] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  async function handleDeleteRoom(roomId: string) {
    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      titleText: "Hapus Room?",
      text: `Room beserta ${room.devices.length} device yang ada di room ini akan dihapus secara permanent.`,
      confirmButtonText: "Hapus Room",
      showCancelButton: true,
      cancelButtonText: "Jangan Deh",
      focusConfirm: false,
      focusCancel: true,
    });
    if (!isConfirmed) return;

    setDeleting(true);
    DeleteRoom(roomId)
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
          {room.name} <br />
          <small className="text-gray-600">ID: {room.id}</small>
        </div>
      </td>
      <td className="p-4 max-w-[15rem]">
        {room.description || <i className="text-gray-600">( Kosyong )</i>}
      </td>
      <td className="p-4">{"Home1"}</td>
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
              <Link
                href={"/dashboard/room/edit/" + room.id}
                className="flex items-center gap-2"
              >
                <PencilSquareIcon className="w-4 h-4" />
                Edit
              </Link>
            </MenuItem>
            <MenuItem placeholder={""} disabled={deleting}>
              <div
                onClick={() => handleDeleteRoom(room.id)}
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

const TableRooms = ({
  rooms,
}: {
  rooms: Prisma.RoomGetPayload<{ include: { devices: true } }>[];
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
          {rooms.map((room, index) => (
            <TableRow key={room.id} room={room} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRooms;

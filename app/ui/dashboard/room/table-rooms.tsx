"use client";

import {
  AddGuestAccess,
  DeleteDevice,
  DeleteRoom,
  RemoveGuestAccess,
} from "@/lib/actions";
import { Confirm, Toast } from "@/lib/utils/swal";
import type { DeviceType, RoomType } from "@/types";

import { Button } from "@material-tailwind/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const TableRow = ({ room, guest }: { room: RoomType; guest?: boolean }) => {
  return (
    <tr className="text-sm border-b text-blue-gray-900  border-gray-400 hover:bg-blue-gray-50/50 ">
      <Link href={"/dashboard/room/" + room.id}>
        <td className="p-4 hover:cursor-pointer">
          <h1 className="text-semibold">{room.name} </h1>
          <small className="text-gray-600 whitespace-nowrap">
            ID: {room.id}
          </small>
        </td>
      </Link>

      <td className="p-4 hidden md:table-cell">
        {guest ? room.user.email : "You"}
      </td>
      <td className="p-4 text-center hidden md:table-cell">
        {room.createdAt.toLocaleDateString()}
      </td>
      <td className="p-4 text-center hidden md:table-cell">
        {room.devices.length}
      </td>
      <td className="p-4 text-center hidden md:table-cell">
        {room.guests.length}
      </td>
      <td className="p-4 w-12 text-center">
        <Link href={"/dashboard/room/" + room.id}>
          <Button placeholder={""} size="sm" variant="text" color="indigo">
            Detail
          </Button>
        </Link>
      </td>
    </tr>
  );
};

// ============================================================================
// ============================================================================

const TableRooms = ({
  rooms,
  guest,
}: {
  rooms: RoomType[] | undefined;
  guest?: boolean;
}) => {
  const [listRooms, setListRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    setListRooms(rooms || []);
  }, [rooms]);

  return (
    <div className="h-full w-full overflow-auto shadow-none rounded !m-0 border border-gray-400">
      <table className="w-full text-left ">
        <thead>
          <tr className=" text-sm border-b border-gray-400">
            <th className="p-4">Name</th>
            <th className="p-4 hidden md:table-cell">Owner</th>
            <th className="p-4 w-0 whitespace-nowrap text-center  hidden md:table-cell">
              Created Date
            </th>
            <th className="p-4  w-0 text-center hidden md:table-cell">
              Devices
            </th>
            <th className="p-4  w-0 text-center hidden md:table-cell">
              Guests
            </th>
            <th className="p-4 w-0 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {listRooms.map((room, index) => (
            <TableRow key={room.id} room={room} guest={guest} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRooms;

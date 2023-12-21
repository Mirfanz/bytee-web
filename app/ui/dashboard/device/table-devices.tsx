"use client";
import { Cog6ToothIcon, PowerIcon } from "@heroicons/react/24/outline";
import { Badge, Card, IconButton, Typography } from "@material-tailwind/react";
import { Prisma } from "@prisma/client";

const TABLE_HEAD = ["Name", "Description", "Relay.1", "Relay.2", "Room", ""];

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
          {devices.map(
            ({ name, id, description, relay1, relay2, room }, index) => (
              <tr
                key={id}
                className="text-sm border-b text-blue-gray-900 border-gray-400 hover:bg-blue-gray-50/50"
              >
                <td className="p-4">
                  <div className="">
                    {name || "No Name"} <br />
                    <small className="text-gray-600">ID: {id}</small>
                  </div>
                </td>
                <td className="p-4">
                  {description || <i className="text-gray-600">( Kosyong )</i>}
                </td>
                <td className="p-4">
                  <div className=" flex gap-1 items-center">
                    <PowerIcon
                      strokeWidth={3}
                      color={relay1.status ? "darkgreen" : "red"}
                      className="h-4 w-4"
                    />
                    {relay1.name || "R.1"}
                  </div>
                </td>
                <td className="p-4">
                  <div className=" flex gap-1 items-center">
                    <PowerIcon
                      strokeWidth={3}
                      color={relay2.status ? "darkgreen" : "red"}
                      className="h-4 w-4"
                    />
                    {relay2.name || "R.2"}
                  </div>
                </td>
                <td className="p-4">{room.name}</td>
                <td className="p-4 w-12 ">
                  <div className="flex">
                    <IconButton
                      placeholder={""}
                      size="sm"
                      variant="text"
                      color="indigo"
                    >
                      <Cog6ToothIcon className="w-5 h-5" />
                    </IconButton>
                  </div>
                </td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TableDevices;

"use client";

import {
  AddGuestAccess,
  DeleteDevice,
  DeleteRoom,
  RemoveGuestAccess,
} from "@/lib/actions";
import { Confirm, Toast } from "@/lib/utils/swal";
import type { DeviceType, RoomType } from "@/types";
import {
  ArrowPathIcon,
  ChevronDownIcon,
  Cog6ToothIcon,
  CubeIcon,
  EllipsisVerticalIcon,
  PencilSquareIcon,
  PlusIcon,
  TrashIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { CogIcon } from "@heroicons/react/24/solid";
import {
  Accordion,
  AccordionBody,
  Button,
  Card,
  Dialog,
  DialogBody,
  DialogHeader,
  IconButton,
  Input,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Spinner,
} from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const TableRow = ({
  room,
  guest,
  showDetailRoom,
  deleteRoom,
  removeGuest,
}: {
  room: RoomType;
  guest?: boolean;
  showDetailRoom: (roomId: string) => void;
  deleteRoom: (roomId: string) => void;
  removeGuest: (P: { roomId: string; guestId?: string }) => void;
}) => {
  return (
    <tr className="text-sm border-b text-blue-gray-900  border-gray-400 hover:bg-blue-gray-50/50 ">
      <td
        className="p-4 hover:cursor-pointer"
        onClick={() => showDetailRoom(room.id)}
      >
        <h1 className="text-purple-900">{room.name} </h1>
        <small className="text-gray-600 whitespace-nowrap">ID: {room.id}</small>
      </td>
      <td className="p-4 hidden md:table-cell">
        {room.user.email}
        {/* <small className="text-gray-600">{room.user.email}</small> */}
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
            {guest ? (
              <>
                <MenuItem
                  placeholder={""}
                  onClick={() => {
                    removeGuest({ roomId: room.id });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <TrashIcon className="w-4 h-4" />
                    Remove Access
                  </div>
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem
                  placeholder={""}
                  onClick={() => {
                    showDetailRoom(room.id);
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Cog6ToothIcon className="w-4 h-4" />
                    Manage
                  </div>
                </MenuItem>

                <MenuItem placeholder={""}>
                  <Link
                    href={"/dashboard/room/edit/" + room.id}
                    className="flex items-center gap-2"
                  >
                    <PencilSquareIcon className="w-4 h-4" />
                    Edit
                  </Link>
                </MenuItem>
                <MenuItem placeholder={""}>
                  <div
                    onClick={() => deleteRoom(room.id)}
                    className="flex items-center gap-2"
                  >
                    <TrashIcon className="w-4 h-4" />
                    Delete
                  </div>
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
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
  rooms: RoomType[];
  guest?: boolean;
}) => {
  const [listRooms, setListRooms] = useState<RoomType[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [shownRoomId, setShownRoomId] = useState<number>(-1);
  const [accordionDevice, setAccordionDevice] = useState<number>();
  const [addGuestField, setAddGuestField] = useState<string>("");
  const [loadingAddGuest, setLoadingAddGuest] = useState<boolean>();
  const router = useRouter();

  useEffect(() => {
    setListRooms(rooms);
  }, [rooms]);

  function showDetailRoom(roomId: string) {
    const roomIndex: number = listRooms.findIndex((item) => item.id == roomId);
    if (roomIndex === undefined) return;
    setShownRoomId(roomIndex);
    setDialogOpen(true);
  }

  async function removeGuest({
    roomId,
    guestEmail,
  }: {
    roomId: string;
    guestEmail?: string;
  }) {
    Swal.fire({
      title: "Remove Access?",
      text: "Anda tidak akan bisa mengontrol room beserta device di dalamnya jika akses anda dihapus.",
      confirmButtonText: "Ya, Hapus",
      confirmButtonColor: "red",
      showCancelButton: true,
      cancelButtonText: "Jangan Dulu",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      RemoveGuestAccess({ roomId, guestEmail })
        .then((resp) => {
          if (resp.error)
            return Toast.fire({
              icon: "error",
              text: resp.error || "Failed remove guest",
            });

          Toast.fire({
            icon: "success",
            text: resp.success || "Guest removed",
          });
          router.refresh();
        })
        .finally(() => {});
    });
  }

  async function deleteRoom(roomId: string) {
    const room: RoomType | undefined = listRooms.find(
      (item) => item.id == roomId
    );
    if (!room) return;
    const roomIndex = listRooms.findIndex((item) => item.id === roomId);
    if (roomIndex === undefined) return;

    const { isConfirmed } = await Swal.fire({
      icon: "warning",
      titleText: "Hapus Room?",
      text: `Room beserta ${room.devices.length} device yang ada di room ini akan dihapus secara permanent.`,
      confirmButtonText: "Hapus Room",
      confirmButtonColor: "red",
      showCancelButton: true,
      cancelButtonText: "Jangan Deh",
      focusConfirm: false,
      focusCancel: true,
    });
    if (!isConfirmed) return;

    DeleteRoom(roomId)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        Toast.fire({
          icon: "success",
          text: data.success,
        });

        const newRooms: RoomType[] = [...listRooms];
        newRooms.splice(roomIndex, 1);
        setListRooms(newRooms);
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          text: "Gagal dihapus",
        });
      });
    //   .finally(() => setDeleting(false));
  }
  async function handleAddGuest() {
    const { isConfirmed } = await Confirm.fire({
      text: `Izinkan ${addGuestField} mengontrol semua device di room ${listRooms[shownRoomId]?.name}`,
    });

    if (!isConfirmed) return;

    setLoadingAddGuest(true);

    AddGuestAccess({
      email: addGuestField,
      roomId: listRooms[shownRoomId]?.id || "",
    })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        Toast.fire({
          icon: "success",
          text: "Berhasil",
        });
        setAddGuestField("");
        router.refresh();
      })
      .catch((error) => {
        console.log("error", error);
        Toast.fire({
          text: error.message,
          icon: "error",
        });
      })
      .finally(() => setLoadingAddGuest(false));
  }

  async function handleDeleteDevice(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    device: DeviceType
  ) {
    const { isConfirmed } = await Confirm.fire({
      icon: "warning",
      titleText: "Hapus Device?",
      text: "Device ini akan dihapus dan tidak dapat dipulihkan kembali.",
      confirmButtonText: "Ya, Hapus",
      confirmButtonColor: "red",
    });
    if (!isConfirmed) return;

    // @ts-ignore
    e.target.disabled = true;
    DeleteDevice(device.id)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        Toast.fire({
          icon: "success",
          text: data.success,
        });
        router.refresh();
      })
      .catch((err) => {
        console.log("err", err);
        Toast.fire({
          icon: "error",
          text: "Gagal dihapus",
        });
        // @ts-ignore
        e.target.disabled = false;
      })
      .finally(() => {});
  }

  return (
    <div className="h-full w-full overflow-auto shadow-none rounded !m-0 border border-gray-400">
      <Dialog
        open={dialogOpen}
        handler={(c) => {
          // setDialogOpen(false);
        }}
        placeholder={""}
        className="max-h-screen overflow-hidden !-translate-y-4 md:!translate-y-0"
      >
        <DialogHeader placeholder={""}>
          <div className="flex w-full gap-0 items-center">
            <h3 className="me-auto text-xl">{listRooms[shownRoomId]?.name}</h3>

            <Button
              placeholder={""}
              size="sm"
              color="red"
              variant="outlined"
              onClick={(e) => {
                setDialogOpen(false);
              }}
            >
              Close
            </Button>
          </div>
        </DialogHeader>
        <hr className="border-gray-400" />
        <DialogBody placeholder={""} className="overflow-auto max-h-[80vh] ">
          <div className="mb-4">
            <List placeholder={""}>
              <ListItem placeholder={""}>
                Owner
                <ListItemSuffix placeholder={""}>
                  {listRooms[shownRoomId]?.user.email}
                </ListItemSuffix>
              </ListItem>
              <ListItem placeholder={""}>
                Created
                <ListItemSuffix placeholder={""}>
                  {listRooms[shownRoomId]?.createdAt.toLocaleDateString()}
                </ListItemSuffix>
              </ListItem>
            </List>
          </div>
          <Card placeholder={""} className="bg-gray-50 mb-4">
            <div className="flex justify-between p-4 pb-0 items-center">
              <h3 className="text-center font-semibold">Devices</h3>{" "}
              {!guest && (
                <Link href={"/dashboard/device/new"}>
                  <Button placeholder={""} size="sm" color="indigo">
                    ADD
                  </Button>
                </Link>
              )}
            </div>
            <List placeholder={""}>
              {listRooms[shownRoomId]?.devices.map((item, index) => (
                <Accordion
                  placeholder={""}
                  key={item.id}
                  open={accordionDevice == index}
                  className="bg-gray-100 rounded-lg"
                >
                  <ListItem
                    placeholder={""}
                    className="focus:bg-gray-100"
                    onClick={() => {
                      setAccordionDevice(accordionDevice == index ? -1 : index);
                    }}
                  >
                    <ListItemPrefix placeholder={""}>
                      <CubeIcon className="h-4 f-4" />
                    </ListItemPrefix>
                    <h6 className="">{item.name}</h6>
                    <ListItemSuffix placeholder={""}>
                      <ChevronDownIcon
                        color="gray"
                        className={`w-4 h-4 duration-150 ${
                          accordionDevice == index ? "rotate-180" : ""
                        }`}
                      />
                    </ListItemSuffix>
                  </ListItem>
                  <AccordionBody>
                    <div className="mx-2">
                      <table cellPadding={6}>
                        {!guest && (
                          <tr>
                            <td>ID</td>
                            <td>:</td>
                            <td>{item.id}</td>
                          </tr>
                        )}
                        <tr>
                          <td>Status</td>
                          <td>:</td>
                          <td>{item.active ? "Aktif" : "Mati"}</td>
                        </tr>
                        <tr>
                          <td>Created</td>
                          <td>:</td>
                          <td>{item.createdAt.toLocaleDateString()}</td>
                        </tr>
                      </table>
                    </div>
                    {!guest && (
                      <div className="mx-4 flex items-center justify-end gap-2">
                        <Link href={"/dashboard/device/edit/" + item.id}>
                          <Button
                            placeholder={""}
                            size="sm"
                            className=""
                            color="indigo"
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          placeholder={""}
                          size="sm"
                          color="red"
                          onClick={(e) => handleDeleteDevice(e, item)}
                        >
                          Hapus
                        </Button>
                      </div>
                    )}
                  </AccordionBody>
                </Accordion>
              ))}
            </List>
          </Card>
          <Card placeholder={""} className="bg-gray-100" color="white">
            <div className="flex justify-between p-4 pb-0 items-center">
              <h3 className="text-center font-semibold">Guests</h3>
              {/* <Button
                placeholder={""}
                size="sm"
                color="indigo"
                onClick={() => setAddGuestMode(!addGuestMode)}
              >
                {addGuestMode ? "Add" : "Close"}
              </Button> */}
            </div>
            <List placeholder={""}>
              {listRooms[shownRoomId || -0]?.guests.map((item, i) => (
                <ListItem
                  key={"guest" + i}
                  placeholder={""}
                  className={guest ? "" : "p-2 ps-4"}
                >
                  <ListItemPrefix placeholder={""}>
                    <UserIcon className="h-4 w-4" />
                  </ListItemPrefix>
                  {item.name}
                  {!guest && (
                    <ListItemSuffix placeholder={""}>
                      <IconButton
                        placeholder={""}
                        size="sm"
                        variant="text"
                        color="red"
                        onClick={() => {
                          if (shownRoomId === undefined) return;
                          const room = listRooms[shownRoomId];
                          if (!room) return;
                          removeGuest({
                            roomId: room.id,
                            guestEmail: item.email,
                          });
                        }}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </ListItemSuffix>
                  )}
                </ListItem>
              ))}
              {!guest && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    return false;
                  }}
                >
                  <div className="flex w-full p-1 gap-2">
                    <Input
                      label="Guest Email"
                      icon={<UserIcon className="w-4 h-4" />}
                      className=" m-0"
                      crossOrigin={false}
                      color="indigo"
                      type="email"
                      value={addGuestField}
                      disabled={loadingAddGuest}
                      onChange={(e) => {
                        const { value } = e.target;
                        setAddGuestField(value);
                      }}
                    />
                    <IconButton
                      placeholder={""}
                      className="w-full"
                      color="indigo"
                      type="submit"
                      onClick={handleAddGuest}
                      disabled={loadingAddGuest}
                    >
                      {loadingAddGuest ? (
                        <Spinner className="h-5 w-5" />
                      ) : (
                        <PlusIcon strokeWidth={2.5} className="w-5 h-5" />
                      )}
                    </IconButton>
                  </div>
                </form>
              )}
            </List>
          </Card>
        </DialogBody>
      </Dialog>

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
            <th className="p-4 w-0">
              <IconButton
                placeholder={""}
                variant="text"
                color="indigo"
                size="sm"
                onClick={router.refresh}
              >
                <ArrowPathIcon className="w-5 h-5" />
              </IconButton>
            </th>
          </tr>
        </thead>
        <tbody>
          {listRooms.map((room, index) => (
            <TableRow
              key={room.id}
              room={room}
              guest={guest}
              showDetailRoom={showDetailRoom}
              deleteRoom={deleteRoom}
              removeGuest={removeGuest}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableRooms;

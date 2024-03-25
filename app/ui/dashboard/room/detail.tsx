"use client";

import { useSession } from "@/app/session-provider";
import { DeleteDevice, DeleteRoom, RemoveGuestAccess } from "@/lib/actions";
import { Confirm, Toast } from "@/lib/utils/swal";
import { DeviceType, RoomType } from "@/types";
import {
  ChevronRightIcon,
  Cog6ToothIcon,
  CogIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import {
  Accordion,
  AccordionBody,
  Avatar,
  Button,
  Card,
  Chip,
  IconButton,
  List,
  ListItem,
  ListItemSuffix,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import Swal from "sweetalert2";
import AddDeviceModal from "../../modals/add-device";
import EditDeviceModal from "../../modals/edit-device";
import ErrorComponent from "../../error";
import AddGuestModal from "../../modals/add-guest";
import EditRoomModal from "../../modals/edit-room";

type Props = {
  room: RoomType;
  owner: boolean;
};

const RoomDetail = ({ room, owner }: Props) => {
  const { user } = useSession();
  const router = useRouter();
  const [accordionDevice, setAccordionDevice] = useState<number>(-1);
  const [dialogAddDevice, setDialogAddDevice] = useState<boolean>(false);
  const [dialogEditDevice, setDialogEditDevice] = useState<boolean>(false);
  const [editCurrentDevice, setEditCurrentDevice] = useState<DeviceType>();
  const [dialogAddGuest, setDialogAddGuest] = useState<boolean>(false);
  const [dialogEditRoom, setDialogEditRoom] = useState<boolean>(false);

  async function handleDeleteRoom() {
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

    DeleteRoom(room.id)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        router.back();
        router.refresh();
        Toast.fire({
          icon: "success",
          text: data.success,
        });
      })
      .catch((err) => {
        Toast.fire({
          icon: "error",
          text: "Gagal menhapus room",
        });
      });
  }

  async function removeGuest(guestEmail: string) {
    Confirm.fire({
      titleText: "Hapus Akses?",
      text: "Pengguna tidak bisa lagi mengontrol device/perangkat di room ini",
      confirmButtonText: "Ya, Hapus",
      confirmButtonColor: "red",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      RemoveGuestAccess({ roomId: room.id, guestEmail })
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
  async function removeMyAccess() {
    Confirm.fire({
      titleText: "Hapus Akses?",
      text: "Anda tidak akan bisa mengakses dan mengontrol device di room ini lagi.",
      confirmButtonText: "Ya, Hapus",
      confirmButtonColor: "red",
    }).then(({ isConfirmed }) => {
      if (!isConfirmed) return;
      RemoveGuestAccess({ roomId: room.id })
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
          router.back();
        })
        .finally(() => {});
    });
  }

  async function handleDeleteDevice(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    device: DeviceType
  ) {
    const { isConfirmed } = await Confirm.fire({
      icon: "warning",
      titleText: "Hapus Device?",
      text:
        "Apa anda yakin ingin menghapus device " +
        device.name +
        " dari room " +
        room.name,
      confirmButtonText: "Ya, Hapus",
      confirmButtonColor: "red",
    });
    if (!isConfirmed) return;

    e.currentTarget?.setAttribute("disabled", "true");
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
        e.currentTarget?.setAttribute("disabled", "false");
      });
  }

  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-2 mb-4 lg:mb-8">
          <h1 className="text-2xl font-semibold me-auto text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            My Rooms &gt; {room.name}
          </h1>
          {owner && (
            <Menu placement="bottom-start">
              <MenuHandler>
                <IconButton placeholder={""} size="sm">
                  <Cog6ToothIcon className="w-5 h-5" />
                </IconButton>
              </MenuHandler>
              <MenuList
                placeholder={""}
                className="w-32 min-w-0 p-1 text-indigo-700"
              >
                <MenuItem
                  placeholder={""}
                  className="flex gap-2 items-center"
                  onClick={() => setDialogEditRoom((prev) => !prev)}
                >
                  <PencilSquareIcon className="w-4 h-4" /> Edit
                </MenuItem>
                <MenuItem
                  placeholder={""}
                  onClick={handleDeleteRoom}
                  className="flex gap-2 items-center text-deep-orange-700"
                >
                  <TrashIcon className="w-4 h-4 " /> Hapus
                </MenuItem>
              </MenuList>
            </Menu>
          )}
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-6">
            <Card className="p-4" placeholder={""}>
              <h5 className="underline font-medium underline-offset-8 mb-5">
                Devices / Perangkat
              </h5>
              {room.devices.length ? (
                <List placeholder={""} className="p-0 gap-2 font-[inherit]">
                  {room.devices.map((device, id) => (
                    <Accordion
                      key={"accordiondevice" + id}
                      placeholder={""}
                      className="bg-blue-gray-50 rounded-md"
                      open={accordionDevice == id}
                    >
                      <ListItem
                        placeholder={""}
                        onClick={() =>
                          setAccordionDevice((prev) => (prev == id ? -1 : id))
                        }
                        className="py-2"
                      >
                        <h5 className="line-clamp-1 me-auto">{device.name}</h5>
                        <ListItemSuffix placeholder={""}>
                          <IconButton placeholder={""} variant="text" size="sm">
                            <ChevronRightIcon
                              className={
                                "w-4 h-4 duration-150 " +
                                (accordionDevice == id ? "rotate-90" : "")
                              }
                            />
                          </IconButton>
                        </ListItemSuffix>
                      </ListItem>
                      <AccordionBody className="pt-0">
                        <div className="px-2">
                          <table cellPadding={4}>
                            {owner && (
                              <tr>
                                <td>ID</td>
                                <td className="px-2"> : </td>
                                <td>{device.id}</td>
                              </tr>
                            )}
                            <tr>
                              <td>Status</td>
                              <td className="px-2"> : </td>
                              <td>{device.active ? "Online" : "Offline"}</td>
                            </tr>
                            <tr>
                              <td>Value</td>
                              <td className="px-2"> : </td>
                              <td>{device.state ? "Hidup" : "Mati"}</td>
                            </tr>
                            {owner && (
                              <tr>
                                <td>Dibuat</td>
                                <td className="px-2"> : </td>
                                <td>{device.createdAt.toLocaleString()}</td>
                              </tr>
                            )}
                            {owner && (
                              <tr>
                                <td>Aksi</td>
                                <td className="px-2"> : </td>
                                <td>
                                  <div className="flex ">
                                    <Button
                                      className="rounded-e-none bg-deep-orange-50"
                                      placeholder={""}
                                      size="sm"
                                      color="deep-orange"
                                      variant="text"
                                      onClick={(e) =>
                                        handleDeleteDevice(e, device)
                                      }
                                    >
                                      Hapus
                                    </Button>
                                    <Button
                                      className="rounded-s-none bg-indigo-50"
                                      placeholder={""}
                                      onClick={() => {
                                        setEditCurrentDevice(device);
                                        setDialogEditDevice(true);
                                      }}
                                      size="sm"
                                      color="indigo"
                                      variant="text"
                                    >
                                      Ubah
                                    </Button>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </table>
                        </div>
                      </AccordionBody>
                    </Accordion>
                  ))}
                </List>
              ) : (
                <ErrorComponent
                  message="Tidak ada device"
                  status="warning"
                  className="m-0 p-0"
                />
              )}
              {owner && (
                <div className="">
                  <Button
                    placeholder={""}
                    size="md"
                    color="teal"
                    onClick={() => setDialogAddDevice(true)}
                    className="w-full mt-4"
                  >
                    Buat Perangkat Baru
                  </Button>
                </div>
              )}
            </Card>
          </div>
          <div className="col-span-12 lg:col-span-6">
            <Card placeholder={""} className="p-4">
              <h5 className="underline font-medium underline-offset-8 mb-5">
                Yang Memiliki Akses
              </h5>
              <List placeholder={""} className="p-0 font-[inherit] gap-2">
                <ListItem placeholder={""} className="bg-blue-gray-50 py-2">
                  <div className="flex w-full items-center gap-3">
                    <Avatar
                      placeholder={""}
                      src={room.user.image || "/img/no-profile.png"}
                    />
                    <div className="">
                      <h1 className="font-medium -mb-1">
                        {user?.email === room.user.email
                          ? "Anda"
                          : room.user.name}
                      </h1>
                      <small className="">{room.user.email}</small>
                    </div>
                    <ListItemSuffix placeholder={""}>
                      <Chip value="Pemilik" variant="ghost" color="teal" />
                    </ListItemSuffix>
                  </div>
                </ListItem>
                {room.guests.map((guest, index) => (
                  <ListItem
                    placeholder={""}
                    className="bg-blue-gray-50 py-2"
                    key={"guest" + index}
                  >
                    <div className="flex w-full items-center gap-3">
                      <Avatar
                        placeholder={""}
                        src={guest.image || "/img/no-profile.png"}
                      />
                      <div className="">
                        <h1 className="font-medium -mb-1">
                          {user?.email === guest.email ? "Anda" : guest.name}
                        </h1>
                        <small className="">{guest.email}</small>
                      </div>
                      {owner && (
                        <ListItemSuffix placeholder={""}>
                          <IconButton
                            placeholder={""}
                            color="deep-orange"
                            size="sm"
                            onClick={() => removeGuest(guest.email)}
                          >
                            <TrashIcon className="w-5 h-5" />
                          </IconButton>
                        </ListItemSuffix>
                      )}
                    </div>
                  </ListItem>
                ))}
              </List>
              {owner ? (
                <Button
                  placeholder={""}
                  color="teal"
                  className="w-full mt-4"
                  onClick={() => setDialogAddGuest(true)}
                >
                  Izinkan Pengguna Lain
                </Button>
              ) : (
                <Button
                  placeholder={""}
                  color="deep-orange"
                  className="w-full mt-4"
                  onClick={removeMyAccess}
                >
                  Hapus Izin Saya
                </Button>
              )}
            </Card>
          </div>
        </div>
      </div>
      <AddDeviceModal
        isOpen={dialogAddDevice}
        roomId={room.id}
        onClose={() => setDialogAddDevice(false)}
      />
      <EditDeviceModal
        isOpen={dialogEditDevice}
        device={editCurrentDevice}
        onClose={() => setDialogEditDevice(false)}
      />
      <AddGuestModal
        isOpen={dialogAddGuest}
        onClose={() => setDialogAddGuest(false)}
        roomId={room.id}
      />
      <EditRoomModal
        isOpen={dialogEditRoom}
        onClose={() => setDialogEditRoom(false)}
        room={room}
      />
    </main>
  );
};

export default RoomDetail;

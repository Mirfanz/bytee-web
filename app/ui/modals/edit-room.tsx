"use client";

import { AddDevice, EditDevice, UpdateRoom } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { DeviceType, RoomType } from "@/types";
import {
  Button,
  Dialog,
  DialogBody,
  Input,
  Textarea,
} from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  room: RoomType;
};

const EditRoomModal = ({ isOpen, onClose, room }: Props) => {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [fields, setFields] = useState<{
    name?: string;
    description?: string;
  }>({
    name: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    console.log("Dipanggil");
    setFields({
      name: room.name,
      description: room.description || "",
    });

    setSubmiting(false);
  }, [isOpen]);

  function handleFieldChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.currentTarget;
    setFields((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submiting) return;
    setSubmiting(true);
    UpdateRoom({
      roomId: room.id,
      data: { ...fields },
    })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        onClose();
        router.refresh();
        Toast.fire({ icon: "success", text: "Room Diedit" });
      })
      .catch((error) => {
        setSubmiting(false);
        Toast.fire({
          text: error.message,
          icon: "error",
        });
      });
  }

  return (
    <Dialog
      handler={() => {
        onClose();
      }}
      open={isOpen}
      placeholder={""}
      size="sm"
    >
      <DialogBody placeholder={""}>
        <h1 className="mb-6 text-2xl text-blue-gray-900 mt-2 font-semibold !border-s-4 ps-3 border-indigo-700">
          Edit Room {room.name}
        </h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <Input
              crossOrigin={""}
              onChange={handleFieldChange}
              name="name"
              value={fields.name}
              color="indigo"
              maxLength={20}
              className="w-full !mb-4"
              label="Nama Room"
              required
            />
          </div>
          <div className="mb-3">
            <Textarea
              onChange={handleFieldChange}
              value={fields.description}
              name="description"
              className=""
              color="indigo"
              label="Deskripsi"
            ></Textarea>
          </div>
          <div className="flex gap-3">
            <Button
              placeholder={""}
              variant="filled"
              onClick={onClose}
              className="flex-1 bg-gray-400  text-blue-gray-900 "
            >
              Batal
            </Button>
            <Button
              placeholder={""}
              color="indigo"
              loading={submiting}
              className="flex-1 justify-center"
              type="submit"
            >
              Update
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default EditRoomModal;

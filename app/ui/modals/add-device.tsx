"use client";

import { AddDevice } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
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
  roomId: string;
};

const AddDeviceModal = ({ isOpen, onClose, roomId }: Props) => {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [fields, setFields] = useState<{ name: string; description: string }>({
    name: "",
    description: "",
  });
  const router = useRouter();

  useEffect(() => {
    console.log("useEffect isOpen dijalankan");
    setFields({ name: "", description: "" });
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
    AddDevice({ ...fields, roomId })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        onClose();
        router.refresh();
        Toast.fire({ icon: "success", text: "Device ditambahkan" });
      })
      .catch((error) => {
        setSubmiting(false);
        Toast.fire({
          text: error.message,
          showConfirmButton: false,
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
          Buat Perangkat Baru
        </h1>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <Input
              crossOrigin={""}
              onChange={handleFieldChange}
              name="name"
              value={fields.name}
              color="indigo"
              className="w-full !mb-4"
              label="Nama Perangkat"
              maxLength={20}
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
              Tambah
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default AddDeviceModal;

"use client";

import { AddGuestAccess } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  roomId: string;
};

const AddGuestModal = ({ isOpen, onClose, roomId }: Props) => {
  const [submiting, setSubmiting] = useState<boolean>(false);
  const [emailField, setEmailField] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    setEmailField("");
    setSubmiting(false);
  }, [isOpen]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submiting) return;
    setSubmiting(true);
    AddGuestAccess({ email: emailField, roomId })
      .then((data) => {
        if (data.error) throw new Error(data.error);
        onClose();
        router.refresh();
        Toast.fire({ icon: "success", text: "Izin Akses Diberikan" });
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
    <Dialog handler={onClose} open={isOpen} placeholder={""} size="sm">
      <DialogBody placeholder={""}>
        <h1 className="mb-4 text-2xl text-blue-gray-900 mt-2 font-semibold !border-s-4 ps-3 border-indigo-700">
          Izinkan Seseorang
        </h1>
        <p className="mb-4 text-justify">
          Pengguna yang diberi akses ke room dapat mengontrol device atau
          perangkat di room tersebut, namun tidak dapat mengubah ataupun
          menghapus perangkat.
        </p>
        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <Input
              crossOrigin={""}
              onChange={(e) => setEmailField(e.currentTarget.value)}
              name="email"
              value={emailField}
              color="indigo"
              type="email"
              className="w-full !mb-4"
              label="Email Pengguna"
              placeholder="Masukkan alamat email pengguna"
              required
            />
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
              Beri Akses
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default AddGuestModal;

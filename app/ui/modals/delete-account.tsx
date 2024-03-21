"use client";

import { useSession } from "@/app/session-provider";
import { RemoveAccount } from "@/lib/actions";
import { Button, Dialog, DialogBody, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteAccountModal = ({ isOpen, onClose }: Props) => {
  const { user } = useSession();
  const [emailField, setEmailField] = useState<string>("");
  const [deleting, setDeleting] = useState<boolean>(false);
  useEffect(() => {
    setEmailField("");
    setDeleting(false);
  }, [isOpen]);

  return (
    <Dialog open={isOpen} handler={onClose} placeholder={""} size="xs">
      <DialogBody placeholder={""}>
        <h1 className="mb-4 text-2xl text-red-500 mt-2 font-semibold !border-s-4 ps-3 border-indigo-700">
          Hapus Akun ?
        </h1>
        <p className="mb-4 text-justify text-base text-gray-800">
          Akun ini akan dihapus secara permanen beserta room dan device di akun
          ini.
        </p>
        <div className="grow w-full mb-4 text-gray-800">
          <small>Konfirmasi dengan mengetik email anda</small>
          <Input
            crossOrigin={""}
            onChange={(e) => {
              setEmailField(e.currentTarget.value);
            }}
            value={emailField}
            color="indigo"
            className="w-full "
          />
        </div>
        <div className="flex gap-3">
          <Button
            placeholder={""}
            variant="filled"
            className="flex-1 bg-gray-400  text-blue-gray-900 "
            onClick={onClose}
          >
            Batal
          </Button>
          <Button
            placeholder={""}
            onClick={() => {
              setDeleting(true);
              RemoveAccount()
                .then((data) => {
                  if (data.error) throw new Error(data.error);
                  Swal.fire({
                    icon: "success",
                    text: data.success,
                    showConfirmButton: false,
                  });
                })
                .catch((error) => {
                  Swal.fire({
                    icon: "error",
                    text: error.message,
                    showConfirmButton: false,
                  });
                })
                .finally(() => setDeleting(false));
            }}
            color="red"
            className="flex-1"
            disabled={emailField !== user?.email || deleting}
            loading={deleting}
          >
            Hapus Akun
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default DeleteAccountModal;

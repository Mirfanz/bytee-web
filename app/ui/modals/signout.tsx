"use client";

import { SignOut } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { Button, Dialog, DialogBody } from "@material-tailwind/react";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const SignoutModal = ({ isOpen, onClose }: Props) => {
  return (
    <Dialog open={isOpen} handler={onClose} placeholder={""} size="xs">
      <DialogBody placeholder={""}>
        <h1 className="mb-4 text-2xl text-blue-gray-900 mt-2 font-semibold !border-s-4 ps-3 border-indigo-700">
          Serius Logout ?
        </h1>
        <p className="mb-4 text-justify text-base text-gray-800">
          Apa kamu yakin mau keluar dari akun ini.
        </p>
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
              SignOut()
                .then((success) => {
                  if (!success)
                    return Toast.fire({
                      text: "Gagal",
                      icon: "error",
                    });
                  Toast.fire({
                    text: "Sampai Jumpa",
                  });
                })
                .finally(() => {
                  onClose();
                });
            }}
            color="red"
            className="flex-1"
          >
            Logout
          </Button>
        </div>
      </DialogBody>
    </Dialog>
  );
};

export default SignoutModal;

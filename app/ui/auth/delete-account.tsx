"use client";

import { Button, IconButton, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import type { SessionType, SigninProps } from "@/types";
import { useRouter } from "next/navigation";
import { RemoveAccount } from "@/lib/actions";
import Swal from "sweetalert2";
import { Toast } from "@/lib/utils/swal";

type Props = {
  sessionData: SessionType;
};

const DeleteAccount = ({ sessionData }: Props) => {
  const router = useRouter();
  const [emailField, setEmailField] = useState<string>("");

  const [deleting, setDeleting] = React.useState(false);

  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <div className="flex gap-4 flex-col p-4 border-2 max-w-sm shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
          <h1 className="text-2xl mt-2 font-semibold !border-s-2 ps-3 border-indigo-700 text-red-500">
            Hapus Akun?
          </h1>
          <p className="text-justify text-base text-gray-700">
            Akun ini akan dihapus secara permanen beserta room dan device di
            akun ini.
          </p>
          <div className="flex gap-3 flex-wrap">
            <div className="grow w-full">
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
            <Button
              placeholder={""}
              variant="filled"
              color="indigo"
              className="flex-1"
              onClick={router.back}
            >
              Gajadi Deh
            </Button>
            <Button
              placeholder={""}
              onClick={() => {
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
                  });
                // SignOut().then((success) => {
                //   if (!success)
                //     return Toast.fire({
                //       text: "Gagal",
                //       icon: "error",
                //     });
                //   router.back();
                //   Toast.fire({
                //     text: "Sampai Jumpa",
                //   });
                // });
              }}
              color="red"
              disabled={emailField != sessionData?.email}
              loading={deleting}
              className="flex-1"
            >
              Hapus Akun
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default DeleteAccount;

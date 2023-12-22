"use client";

import { SignOut } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Signout = (props: Props) => {
  const router = useRouter();
  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <div className="flex gap-4 flex-col p-4 border-2 max-w-sm shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
          <Typography
            placeholder={""}
            variant="h3"
            className="text-2xl my-2 !border-s-2 ps-3 border-indigo-700"
          >
            Serius Logout?
          </Typography>
          <Typography placeholder={""} className="text-justify">
            Gapapa sih, login lagi yaa aku tunggu. Awas jangan sampai lupa akun
            ama password nya.{" "}
            <strong className="font-bold">Terima Kasih</strong>
          </Typography>
          <div className="flex gap-3">
            <Button
              placeholder={""}
              variant="outlined"
              color="indigo"
              className="flex-1"
              onClick={router.back}
            >
              Gajadi Deh
            </Button>
            <Button
              placeholder={""}
              onClick={() => {
                SignOut().then((success) => {
                  if (!success)
                    return Toast.fire({
                      text: "Gagal",
                      icon: "error",
                    });
                  Toast.fire({
                    text: "Sampai Jumpa",
                  });
                  router.back();
                });
              }}
              color="indigo"
              className="flex-1"
            >
              Ya, Logout
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signout;

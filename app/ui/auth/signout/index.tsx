"use client";

import { SignOut } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Signout = (props: Props) => {
  const router = useRouter();
  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <div className="flex gap-4 flex-col p-4 border-2 max-w-sm shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
          <h1 className="text-2xl mt-2 font-semibold !border-s-2 ps-3 border-indigo-700">
            Serius Logout?
          </h1>
          <p className="text-justify text-base text-gray-600">
            Gapapa sih, login lagi yaa aku tunggu. Awas jangan sampai lupa akun
            ama password nya.{" "}
            <strong className="font-semibold text-gray-600">
              Terima Kasih {">_<"}
            </strong>
          </p>
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
                  router.back();
                  Toast.fire({
                    text: "Sampai Jumpa",
                  });
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

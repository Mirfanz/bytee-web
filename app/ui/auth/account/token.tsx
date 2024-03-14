"use client";

import {
  GetLastSendEmailVerification,
  SendEmailVerification,
  SignOut,
  VerifyEmail,
} from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { Button, Chip, Spinner } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = { token: string };

const VerifyingPage = ({ token }: Props) => {
  const router = useRouter();
  const [status, setStatus] = useState<"loading" | "success" | "error" | null>(
    null
  );
  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <div className="flex gap-4 w-full flex-col p-4 border-2 max-w-sm shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
          <h1 className="text-2xl  mt-2 font-semibold  !border-s-2 ps-3 border-indigo-700">
            {!status && "Verifikasi Akun"}
            {status === "loading" && "Tunggu Sebentar ..."}
            {status === "error" && "Verifikasi Gagal"}
            {status === "success" && "Verifikasi Berhasil"}
          </h1>
          <p className="text-justify text-base text-gray-700 mb-1">
            {!status &&
              "Abaikan jika anda tidak merasa membuat akun dengan email ini. Jangan berikan link ini kepada siapapun."}
            {status === "error" &&
              "Mohon maaf, kami tidak dapat memverifikasi email anda silahkan mencoba untuk mengirim ulang link verifikasi."}
            {status === "success" &&
              "Email anda telah berhasil di verifikasi. Silahkan login."}
          </p>
          <Button
            placeholder={""}
            color="teal"
            className="flex-1 justify-center"
            loading={status == "loading"}
            onClick={() => {
              if (!status && status != "loading") {
                setStatus("loading");
                //   setStatus("error");
                VerifyEmail(token)
                  .then((result) => {
                    console.log("result", result);
                    if (result.error) {
                      setStatus("error");
                    } else {
                      setStatus("success");
                    }
                  })
                  .catch((error) => {
                    setStatus("error");
                  });
              } else if (status === "error") router.replace("/account/verify");
              else if (status === "success")
                router.replace("/dashboard/profile");
            }}
          >
            {!status && "Verifikasi"}
            {status === "loading" && "Memverifikasi"}
            {status === "error" && "Kirim Ulang"}
            {status === "success" && "Halaman Profile"}
          </Button>
        </div>
      </div>
    </main>
  );
};

export default VerifyingPage;

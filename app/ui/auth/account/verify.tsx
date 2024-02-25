"use client";

import {
  GetLastSendEmailVerification,
  SendEmailVerification,
  SignOut,
  UpdateSession,
} from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import { SessionType } from "@/types";
import { Button, Chip } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = { sessionData: SessionType; wait: number; delay: number };

const VerifyPage = ({ sessionData, wait, delay }: Props) => {
  const router = useRouter();
  const [waiting, setWaiting] = useState<number>(wait);
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    UpdateSession();
  }, []);
  useEffect(() => {
    if (waiting > 0)
      setTimeout(() => {
        setWaiting(waiting - 1);
      }, 1000);
  }, [waiting]);
  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <div className="flex gap-4 flex-col p-4 border-2 max-w-sm shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
          <h1 className="text-2xl mt-2 font-semibold  !border-s-2 ps-3 border-indigo-700">
            Verifikasi Akun
          </h1>
          <p className="text-justify text-base text-gray-700 mb-1">
            Mohon verifikasi email anda melalui tautan yang telah kami kirim ke{" "}
            <strong className="font-semibold text-gray-600">
              {sessionData?.email}
            </strong>
            .
          </p>
          <div className="">
            {/* {waiting > 0 && (
              <small className="">Kirim ulang setelah {waiting} detik</small>
            )} */}
            <div className="flex flex-col gap-3 ">
              <div className="flex relative items-center">
                <Button
                  placeholder={""}
                  onClick={() => {
                    if (loading) return;
                    setLoading(true);
                    SendEmailVerification()
                      .then((resp) => {
                        if (resp.error)
                          return Swal.fire({
                            titleText: resp.error,
                          });
                        Toast.fire({
                          titleText: resp.success,
                        });

                        const timeGap =
                          new Date().getTime() -
                          (resp.data?.createdAt?.getTime() || 0);
                        console.log("timeGap", timeGap);
                        setWaiting(delay - Math.floor(timeGap / 1000));
                      })
                      .finally(() => {
                        setLoading(false);
                      });
                  }}
                  color="teal"
                  className="flex-1 justify-center"
                  loading={loading}
                  disabled={waiting > 0}
                >
                  Kirim Ulang {waiting > 0 && "( " + waiting + "s )"}
                </Button>
              </div>
              <Button
                placeholder={""}
                variant="outlined"
                color="teal"
                className="flex-1"
                onClick={() => {
                  SignOut().then((success) => {
                    if (!success)
                      return Toast.fire({
                        text: "Gagal",
                        icon: "error",
                      });
                    router.replace("/login");
                    Toast.fire({
                      text: "Sampai Jumpa",
                    });
                  });
                }}
              >
                Ganti Akun
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifyPage;

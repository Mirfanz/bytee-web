"use client";

import {
  GetLastSendEmailVerification,
  SendEmailVerification,
  SignOut,
} from "@/lib/actions";
import { UserType } from "@/lib/utils/session";
import { Toast } from "@/lib/utils/swal";
import { Button, Chip } from "@material-tailwind/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

type Props = { user: UserType | null };

const VerifiedPage = ({ user }: Props) => {
  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <div className="flex gap-4 flex-col p-4 border-2 max-w-sm shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
          <h1 className="text-2xl mt-2 font-semibold  !border-s-2 ps-3 border-indigo-700">
            Akun Terverifikasi
          </h1>
          <p className="text-justify text-base text-gray-700 mb-1">
            Terimakasih telah melakukan verifikasi akun.
          </p>
          <div className="flex relative items-center">
            <Link href={"/dashboard/profile"} className="w-full">
              <Button placeholder={""} color="teal" className="w-full">
                Buka Halaman Akun
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifiedPage;

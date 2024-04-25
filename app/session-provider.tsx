"use client";
import { SignOut } from "@/lib/actions";
import { SessionType } from "@/lib/utils/session";
import React, { createContext, useContext } from "react";
import Swal from "sweetalert2";

type Props = {
  children: React.ReactNode;
  value: SessionType;
};

const SessionContext = createContext<SessionType>({} as SessionType);

const SessionProvider = ({ children, value }: Props) => {
  // console.log("value", value);
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
};

export const useSession = () => {
  const sessionContext = useContext(SessionContext);
  // if (!sessionContext)
  //   throw new Error("useSession harus digunakan di dalam SessionProvider");
  return sessionContext;
};

export async function signOut() {
  return Swal.fire({
    titleText: "LogOut?",
    text: "Yakin mau keluar dari akun ini.",
    showCancelButton: true,
    showConfirmButton: true,
    confirmButtonText: "LogOut",
    confirmButtonColor: "#FF5555",
    cancelButtonText: "Kembali",
    focusCancel: true,
  }).then((value) => {
    if (!value.isConfirmed) return false;
    return SignOut();
  });
}

export default SessionProvider;

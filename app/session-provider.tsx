"use client";
import { SessionType } from "@/lib/utils/session";
import React, { createContext, useContext } from "react";

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

export default SessionProvider;

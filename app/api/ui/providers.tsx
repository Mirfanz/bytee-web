"use client";

import { ThemeProvider } from "@material-tailwind/react";
import React from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return <ThemeProvider>{children}</ThemeProvider>;
}

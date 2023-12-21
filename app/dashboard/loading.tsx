"use client";

import { Spinner, Typography } from "@material-tailwind/react";

export const loading = () => {
  return (
    <div className="flex justify-center flex-col gap-4 items-center w-full h-screen">
      <Spinner className="w-10 h-10" color="indigo" />
      <Typography placeholder={""}>Tunggu Sebentar...</Typography>
    </div>
  );
};
export default loading;

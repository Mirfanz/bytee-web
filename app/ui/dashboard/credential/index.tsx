"use client";

import { FetchApiKey } from "@/lib/actions";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { Button, Input, Typography } from "@material-tailwind/react";
import React from "react";

type Props = {};

const Credetial = (props: Props) => {
  const [apiKey, setApiKey] = React.useState("Loading...");

  React.useEffect(() => {
    FetchApiKey()
      .then((data) => {
        setApiKey(data?.apiKey || "Kesalahan");
      })
      .catch(() => {
        setApiKey("Kesalahan");
      });
  }, []);

  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <Typography
            placeholder={""}
            className="text-2xl me-auto font-bold text-gray-900 !border-s-4 border-indigo-700 ps-2 "
          >
            Credentials
          </Typography>
        </div>
        <div className="flex gap-4 items-center">
          <Typography placeholder={""} className=" flex-grow w-32">
            API_KEY
          </Typography>
          :
          <Input crossOrigin={false} disabled value={apiKey} />
        </div>
      </div>
    </main>
  );
};

export default Credetial;

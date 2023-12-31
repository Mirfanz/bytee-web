"use client";

import { ExclamationCircleIcon } from "@heroicons/react/24/outline";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid";
import { Alert } from "@material-tailwind/react";
import React, { ComponentProps } from "react";

type Props = {
  message: string;
  status: "warning" | "error";
};

const ErrorComponent = ({
  message,
  status,
  className,
}: Props & ComponentProps<"div">) => {
  return (
    <main>
      <div className={"container py-4 " + className}>
        <Alert
          color={status == "error" ? "red" : "amber"}
          variant="filled"
          onClose={() => {}}
          icon={
            status == "error" ? (
              <ExclamationTriangleIcon className="w-5 h-5" />
            ) : (
              <ExclamationCircleIcon className="w-5 h-5" />
            )
          }
          className={"items-center"}
        >
          {message}
        </Alert>
      </div>
    </main>
  );
};

export default ErrorComponent;

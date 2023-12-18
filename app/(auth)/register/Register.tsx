"use client";

import { Button, Input, Typography } from "@material-tailwind/react";
import React, { ChangeEvent } from "react";
import { Register as ActionRegister, RegisterProps } from "@/lib/actions";
import { inputProps } from "@material-tailwind/react/types/components/slider";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const [fields, setFields] = React.useState<RegisterProps>({
    email: "",
    name: "",
    password: "",
  });

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    ActionRegister(fields).then((data) => {
      if (data.success) return router.replace("/dashboard/profile");
      Swal.fire({
        titleText: data.message,
        confirmButtonText: "Login",
        showCancelButton: true,
        cancelButtonText: "Coba Lagi",
        focusCancel: true,
      });
    });
  };

  const handleFieldChange = (e: any) => {
    const { name, value } = e.target;
    const newFields: RegisterProps = { ...fields, [name]: value };
    setFields(newFields);
  };

  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <form
          onSubmit={handleSubmitRegister}
          className="w-[400px] max-w-[90vw]"
        >
          <div className="flex gap-4 flex-col p-4 border-2 shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
            <Typography
              placeholder={""}
              variant="h3"
              className="text-2xl my-2 !border-s-2 ps-3 border-indigo-700"
            >
              Register An Account
            </Typography>
            <Input
              color="indigo"
              name="name"
              value={fields?.name}
              onChange={handleFieldChange}
              label="Full Name"
              variant="outlined"
              crossOrigin={false}
            />
            <Input
              color="indigo"
              name="email"
              value={fields?.email}
              onChange={handleFieldChange}
              type="email"
              label="Email / Username"
              variant="outlined"
              crossOrigin={false}
            />
            <Input
              color="indigo"
              name="password"
              value={fields?.password}
              onChange={handleFieldChange}
              label="Password"
              type="password"
              crossOrigin={false}
            />
            <Button type="submit" placeholder={"sds"} color="indigo">
              Register Now
            </Button>
            <Typography
              className="text-center"
              variant="small"
              placeholder={""}
            >
              Sudah Punya Akun?
              <Link href={"/login"} className="text-indigo-500 ms-1" replace>
                Login
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;

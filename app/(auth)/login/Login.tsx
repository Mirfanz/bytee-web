"use client";

import { Button, Input, Typography } from "@material-tailwind/react";
import React, { ChangeEvent } from "react";
import { Signin, SigninProps } from "@/lib/actions";
import { inputProps } from "@material-tailwind/react/types/components/slider";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [fields, setFields] = React.useState<SigninProps>({
    email: "",
    password: "",
  });

  const handleSubmitLogin = (e: React.FormEvent) => {
    e.preventDefault();
    Signin(fields).then((data) => {
      if (data.success) return router.replace("/dashboard/profile");
      Swal.fire({
        titleText: "Login Gagal",
        text: data.message,
      });
    });
  };

  const handleFieldChange = (e: any) => {
    const { name, value } = e.target;
    const newFields: SigninProps = { ...fields, [name]: value };
    setFields(newFields);
  };

  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <form onSubmit={handleSubmitLogin} className="w-[400px] max-w-[90vw]">
          <div className="flex gap-4 flex-col p-4 border-2 shadow-lg  shadow-indigo-900/50 border-indigo-600  rounded-lg">
            <Typography
              placeholder={""}
              variant="h3"
              className="text-2xl my-2 !border-s-2 ps-3 border-indigo-700"
            >
              Login Account
            </Typography>
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
              Login
            </Button>
            <Typography
              className="text-center"
              variant="small"
              placeholder={""}
            >
              Belum Punya Akun?
              <Link href={"/register"} className="text-indigo-500 ms-1" replace>
                Register
              </Link>
            </Typography>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

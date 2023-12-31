"use client";

import { Button, IconButton, Input } from "@material-tailwind/react";
import React, { ChangeEvent, ChangeEventHandler } from "react";
import { Signin, SigninProps } from "@/lib/actions";
import Link from "next/link";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Toast } from "@/lib/utils/swal";

type Props = {};

const Login = (props: Props) => {
  const router = useRouter();
  const [fields, setFields] = React.useState<SigninProps>({
    email: "",
    password: "",
  });

  const [submiting, setSubmiting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmitLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submiting) return false;

    setSubmiting(true);
    Signin(fields)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        router.replace("/dashboard/profile");
        Toast.fire({
          titleText: "Hi, " + data.name,
        });
      })
      .catch((error) => {
        setFields({ ...fields, password: "" });
        setSubmiting(false);
        Swal.fire({
          text: error.message,
          showConfirmButton: false,
          icon: "error",
        });
      });
  };

  const handleFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFields: SigninProps = { ...fields, [name]: value };
    setFields(newFields);
  };

  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <form
          onSubmit={handleSubmitLogin}
          autoComplete="off"
          className="w-[400px] max-w-[90vw]"
        >
          <div className="flex gap-4 flex-col p-4 border-2 shadow-lg  shadow-indigo-900/50 border-indigo-600  rounded-lg">
            <h1 className="text-2xl font-semibold my-2 !border-s-2 ps-3 border-indigo-700">
              Login Account
            </h1>
            <Input
              className="invalid:text-red-400"
              color="indigo"
              name="email"
              value={fields?.email}
              onChange={handleFieldChange}
              type="email"
              label="Email / Username"
              variant="outlined"
              crossOrigin={false}
              required
            />
            <div className="relative">
              <Input
                className="invalid:text-red-400"
                color="indigo"
                name="password"
                value={fields?.password}
                onChange={handleFieldChange}
                label="Password"
                type={showPassword ? "text" : "password"}
                crossOrigin={false}
                required
                minLength={8}
              />
              <IconButton
                variant="text"
                color="indigo"
                className="!absolute right-0 top-0"
                placeholder={""}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </IconButton>
            </div>
            <Button
              type="submit"
              disabled={submiting}
              placeholder={""}
              color="indigo"
              loading={submiting}
              className="text-center justify-center"
            >
              {submiting ? "Tunggu Sebentar..." : "Login"}
            </Button>
            <p className="text-center text-sm">
              Belum Punya Akun?
              <Link href={"/register"} className="text-indigo-500 ms-1" replace>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Login;

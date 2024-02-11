"use client";

import { Button, IconButton, Input } from "@material-tailwind/react";
import React, { ChangeEvent } from "react";
import { Register as ActionRegister } from "@/lib/actions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Toast } from "@/lib/utils/swal";
import type { RegisterProps } from "@/types";

type Props = {};

const Register = (props: Props) => {
  const router = useRouter();
  const [fields, setFields] = React.useState<RegisterProps>({
    email: "",
    name: "",
    password: "",
  });

  const [repeatPassword, setRepeatPassword] = React.useState<string>("");
  const [submiting, setSubmiting] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleSubmitRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (submiting) return false;
    if (fields.password !== repeatPassword)
      return Swal.fire({
        icon: "warning",
        text: "Password tidak cocok",
        showConfirmButton: false,
      });
    setSubmiting(true);
    ActionRegister(fields)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        router.replace("/dashboard/profile");
        Toast.fire({
          titleText: "Hi, " + data.name,
        });
      })
      .catch((error) => {
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
    const newFields: RegisterProps = { ...fields, [name]: value };
    setFields(newFields);
  };

  return (
    <main>
      <div className="container !h-screen items-center flex justify-center">
        <form
          onSubmit={handleSubmitRegister}
          className="w-[400px] max-w-[90vw]"
          autoComplete="off"
        >
          <div className="flex gap-4 flex-col p-4 border-2 shadow-lg shadow-indigo-900/50 border-indigo-600  rounded-lg">
            <h1 className="text-2xl font-semibold my-2 !border-s-2 ps-3 border-indigo-700">
              Register An Account
            </h1>
            <Input
              color="indigo"
              name="name"
              value={fields?.name}
              onChange={handleFieldChange}
              label="Full Name"
              variant="outlined"
              crossOrigin={false}
              required
              minLength={5}
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
              required
            />
            <div className="relative">
              <Input
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
                placeholder={""}
                onClick={() => setShowPassword(!showPassword)}
                className="!absolute top-0 right-0"
                variant="text"
                color="indigo"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5" />
                ) : (
                  <EyeIcon className="w-5 h-5" />
                )}
              </IconButton>
            </div>
            <Input
              color="indigo"
              name="repeatpassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              label="Repeat Password"
              type={showPassword ? "text" : "password"}
              crossOrigin={false}
              required
              minLength={8}
            />
            <Button
              type="submit"
              placeholder={"sds"}
              color="indigo"
              loading={submiting}
              disabled={submiting}
              className="justify-center"
            >
              {submiting ? "Tunggu Sebentar..." : "Register Now"}
            </Button>
            <p className="text-center text-sm">
              Sudah Punya Akun?
              <Link href={"/login"} className="text-indigo-500 ms-1" replace>
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Register;

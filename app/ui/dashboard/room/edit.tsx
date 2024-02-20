"use client";

import { UpdateRoom } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
import type { RoomType } from "@/types";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Option,
  Select,
  Textarea,
} from "@material-tailwind/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent } from "react";
import Swal from "sweetalert2";

type Props = {
  room: RoomType;
};

type FieldsType = {
  name: string;
  description: string;
};

const Edit = ({ room }: Props) => {
  const router = useRouter();

  const [submiting, setSubmiting] = React.useState(false);
  const [fields, setFields] = React.useState<FieldsType>({
    name: room.name || "",
    description: room.description || "",
  });

  function handleFieldChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;

    setFields({ ...fields, [name]: value });
  }

  async function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    if (submiting) return;
    setSubmiting(true);
    UpdateRoom({ roomId: room.id, data: fields })
      .then((data: any) => {
        if (data.error) throw new Error(data.error);
        router.back();
        router.refresh();
        Toast.fire({ icon: "success", text: "Room diedit" });
      })
      .catch((error) => {
        Swal.fire({
          text: error.message,
          showConfirmButton: false,
          icon: "error",
        });
        setSubmiting(false);
      });
  }

  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl me-auto font-semibold text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            My Rooms
          </h1>
        </div>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 mb-12">
              <Select placeholder={null} value="Home1" label="Home">
                <Option>Home1</Option>
              </Select>
              <Input
                name="name"
                value={fields.name}
                onChange={handleFieldChange}
                color="indigo"
                crossOrigin={false}
                label="Name"
                required
                minLength={4}
              />
              <Textarea
                name="description"
                value={fields.description}
                onChange={handleFieldChange}
                color="indigo"
                label="Description"
                required={false}
              ></Textarea>
              <Button
                placeholder={""}
                className="flex items-center justify-center gap-2"
                color="indigo"
                loading={submiting}
                type="submit"
              >
                {submiting ? "Tunggu Sebentar..." : "Update Room"}
              </Button>
            </div>

            <div className="m-auto">
              <Card placeholder={""}>
                <CardHeader placeholder={""} className="p-4">
                  <Image
                    src={"/icon.png"}
                    // className="w-20"
                    width={500}
                    height={500}
                    alt="Logo"
                  />
                </CardHeader>
                <CardBody placeholder={""} className="text-justify">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Cumque debitis qui eveniet, adipisci autem nesciunt sint earum
                  facilis eaque accusantium.
                </CardBody>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Edit;

"use client";

import { AddDeviceProps, FetchRooms, AddDevice } from "@/lib/actions";
import { Toast } from "@/lib/utils/swal";
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

type Props = {};

const NewDevice = (props: Props) => {
  const router = useRouter();

  const [submiting, setSubmiting] = React.useState(false);
  const [fields, setFields] = React.useState<AddDeviceProps>({
    roomId: "",
    name: "",
    description: "",
  });
  const [roomOptions, setRoomOptions] = React.useState<
    { name: string; roomId: string }[]
  >([]);

  React.useEffect(() => {
    FetchRooms({}).then((data) => {
      if (!data) return;
      const newData = data?.map((item) => ({
        name: item.name,
        roomId: item.id,
      }));
      setRoomOptions(newData);
    });
  }, []);

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

    AddDevice(fields)
      .then((data) => {
        if (data.error) throw new Error(data.error);
        router.back();
        router.refresh();
        Toast.fire({ icon: "success", text: "Device ditambahkan" });
      })
      .catch((error) => {
        setSubmiting(false);
        Swal.fire({
          text: error.message,
          showConfirmButton: false,
          icon: "error",
        });
      });
  }

  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl me-auto font-semibold text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            My Devices
          </h1>
        </div>
        <form onSubmit={handleFormSubmit} autoComplete="off">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4 mb-12">
              <Select
                placeholder={null}
                name="roomId"
                onChange={(val) => {
                  setFields({ ...fields, roomId: val || "" });
                }}
                label="Room"
              >
                {roomOptions?.map((opt) => (
                  <Option key={opt.roomId} value={opt.roomId}>
                    {opt.name}
                  </Option>
                ))}
              </Select>
              <Input
                name="name"
                value={fields.name}
                onChange={handleFieldChange}
                color="indigo"
                crossOrigin={false}
                label="Name"
                required
                minLength={2}
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
                {submiting ? "Tunggu Sebentar..." : "Add Device"}
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

export default NewDevice;

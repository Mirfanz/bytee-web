"use client";

import { GlobeAltIcon, PaperClipIcon } from "@heroicons/react/24/outline";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import React from "react";

type Props = {
  notifications: Prisma.NotificationGetPayload<{}>[];
};

const Notification = ({ notifications }: Props) => {
  return (
    <main>
      <div className="container py-4 lg:!p-8">
        <div className="flex justify-between items-center gap-3 mb-6">
          <h1 className="text-2xl me-auto font-semibold text-gray-900 !border-s-4 border-indigo-700 ps-2 ">
            Notifications
          </h1>
        </div>

        <div className="flex flex-col gap-3">
          {notifications?.map((item) => (
            <Card key={item.id} placeholder={""}>
              <CardBody placeholder={""} className="text-sm p-4">
                <div className="flex items-center">
                  {!item.userId && (
                    <GlobeAltIcon className="w-5 h-5 me-1" color="green" />
                  )}
                  <h5 className="font-semibold !line-clamp-1 text-sm ">
                    {item.title}
                  </h5>
                  <small className="ms-auto min-w-max">
                    {item.createdAt.toLocaleString().slice(0, -3)}
                  </small>
                </div>
                <hr className="bg-gray-700 my-3" />
                <p className="text-justify !whitespace-pre-wrap">
                  {item.message}
                </p>
                {item.url && (
                  <Link href={item.url}>
                    <Button
                      size="sm"
                      placeholder={""}
                      className="mt-2 bg-blue-50 flex items-center gap-2"
                      color="blue"
                      variant="text"
                    >
                      <PaperClipIcon className="w-4 h-4" />
                      Kunjungi Tautan
                    </Button>
                  </Link>
                )}
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Notification;

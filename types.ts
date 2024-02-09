import { Prisma } from "@prisma/client";

export interface UserType {
  name: string;
  email: string;
  role: "user" | "member" | "admin";
  image: undefined | string | null;
}

export type RoomType = Prisma.RoomGetPayload<{
  include: {
    devices: true;
    guests: true;
    user: {
      select: {
        email: true;
        name: true;
      };
    };
    _count: { select: { guests: true; devices: true } };
  };
}>;

export type DeviceType = Prisma.DeviceGetPayload<{}>;

export type SubscribeType = string;

export type PublishType = {
  deviceId: string;
  state: boolean;
};

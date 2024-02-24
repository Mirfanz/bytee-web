import { Prisma } from "@prisma/client";
import { JwtPayload } from "jsonwebtoken";

export type UserType = {
  name: string;
  email: string;
  role: "user" | "member" | "admin";
  image: string | null;
};

export type SessionType = (UserType & { verified: boolean }) | null;

export type RoomType = Prisma.RoomGetPayload<{
  select: {
    name: true;
    id: true;
    description: true;
    createdAt: true;
    devices: {
      select: {
        id: true;
        name: true;
        active: true;
        createdAt: true;
        description: true;
        state: true;
      };
    };
    guests: {
      select: {
        name: true;
        email: true;
        image: true;
        role: true;
      };
    };
    user: {
      select: {
        email: true;
        image: true;
        name: true;
        role: true;
      };
    };
  };
}>;

export type DeviceType = Prisma.DeviceGetPayload<{
  select: {
    id: true;
    name: true;
    active: true;
    createdAt: true;
    description: true;
    state: true;
  };
}>;

// =================================================================
// =================================================================
export type SubscribeProps = string;

export type PublishProps = {
  deviceId: string;
  state: boolean;
};

export type RegisterProps = {
  email: string;
  password: string;
  name: string;
};

export type SigninProps = {
  email: string;
  password: string;
};

export type AddRoomProps = {
  name: string;
  description: string | undefined | null;
};

export type AddDeviceProps = {
  roomId: string;
  name: string;
  description: string | undefined;
};

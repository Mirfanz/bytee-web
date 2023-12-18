import jwt from "jsonwebtoken";
import { compareSync, hashSync } from "bcrypt";
import { UserType } from "@/types";

export async function encode(payload: UserType) {
  //@ts-ignore
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

export async function decode(token: string) {
  //@ts-ignore
  return jwt.verify(token, process.env.JWT_SECRET, {});
}

export async function hash(password: string) {
  return hashSync(password, 10);
}

export async function compare(password: string, hashedPassword: string) {
  return compareSync(password, hashedPassword);
}

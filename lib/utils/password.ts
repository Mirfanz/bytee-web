import { compareSync, hashSync } from "bcrypt";

export function hashPassword(password: string) {
  return hashSync(password, 10);
}

export function comparePassword(password: string, hashedPassword: string) {
  return compareSync(password, hashedPassword);
}

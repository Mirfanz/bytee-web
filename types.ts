export interface UserType {
  name: string;
  email: string;
  role: "user" | "member" | "admin";
  image: undefined | string | null;
}

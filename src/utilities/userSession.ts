import { IUser } from "../types/IUser";

export function authenticated(): boolean {
  return !!currentUser();
}

export function currentUser(): IUser["user"] | null {
  const user: string | null = localStorage.getItem("user");
  return user ? JSON.parse(user) : user;
}
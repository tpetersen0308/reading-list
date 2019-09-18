import { Dispatch, SetStateAction } from "react";

export interface IUser {
  user: {
    avatar: string,
  } | null,
  setUser: Dispatch<SetStateAction<IUser["user"] | null>>
}
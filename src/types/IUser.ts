import { Dispatch, SetStateAction } from "react";
import { IReadingList } from "./IReadingList";

export interface IUser {
  user: {
    avatar: string,
    readingLists: IReadingList["readingList"][]
  },
  setUser: Dispatch<SetStateAction<IUser["user"] | null>>
}
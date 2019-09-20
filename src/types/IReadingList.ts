import { IBook } from "./IBook";
import { Dispatch, SetStateAction } from "react";

export interface IReadingList {
  readingList: {
    title?: string,
    readingListId?: string,
    books: IBook[]
  },
  setReadingLists: Dispatch<SetStateAction<IReadingList["readingList"][] | null>>
}
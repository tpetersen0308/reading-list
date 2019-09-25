import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IBook } from "../../types/IBook";
import { IUser } from "../../types/IUser";
import { IApiResponse } from "../../types/IApiResponse";
import { IEvent } from "../../types/IEvent";
import { Dispatch, SetStateAction } from "react";
import { IReadingList } from "../../types/IReadingList";

export interface BooksListProps {
  books: IBook[],
  user: IUser["user"] | null,
  setUser: IUser["setUser"],
  setReadingList?: Dispatch<SetStateAction<IReadingList["readingList"] | null>>,
  apiHandler: ApiHandler,
  searchMode: boolean,
  handleUpdate?: (event: IEvent["changeEvent"], bookId: string) => Promise<IApiResponse["readingList"]>
}
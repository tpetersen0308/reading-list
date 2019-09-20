import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IBook } from "../../types/IBook";
import { IReadingList } from "../../types/IReadingList";

export interface BookCardProps {
  book: IBook,
  apiHandler: ApiHandler,
  readingLists: IReadingList["readingList"][] | null,
  setReadingLists: IReadingList["setReadingLists"],
  authenticated: boolean
}
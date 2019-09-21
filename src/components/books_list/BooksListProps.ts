import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IBook } from "../../types/IBook";
import { IUser } from "../../types/IUser";

export interface BooksListProps {
  books: IBook[],
  user: IUser["user"] | null,
  setUser: IUser["setUser"],
  apiHandler: ApiHandler,
  searchMode: boolean
}
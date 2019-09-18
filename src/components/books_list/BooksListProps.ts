import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IBook } from "../../types/IBook";

export interface BooksListProps {
  books: IBook[],
  apiHandler: ApiHandler
}
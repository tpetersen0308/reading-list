import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IBook } from "../../types/IBook";

export interface BookCardProps {
  book: IBook,
  apiHandler: ApiHandler,
  authenticated: boolean
}
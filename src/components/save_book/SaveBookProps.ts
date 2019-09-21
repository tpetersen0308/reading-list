import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IBook } from "../../types/IBook";
import { IUser } from "../../types/IUser";

export interface SaveBookProps {
  book: IBook,
  apiHandler: ApiHandler,
  user: IUser["user"],
  setUser: IUser["setUser"]
}
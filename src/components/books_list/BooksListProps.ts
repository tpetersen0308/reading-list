import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IBook } from "../../types/IBook";
import { IUser } from "../../types/IUser";
import { IApiResponse } from "../../types/IApiResponse";
import { IEvent } from "../../types/IEvent";

export interface BooksListProps {
  books: IBook[],
  user: IUser["user"] | null,
  setUser: IUser["setUser"],
  apiHandler: ApiHandler,
  searchMode: boolean,
  handleUpdate?: (event: IEvent["changeEvent"], bookId: string) => Promise<IApiResponse["readingList"]>
}
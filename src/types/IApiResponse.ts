import { IError } from "./IError";
import { IUser } from "./IUser";
import { IReadingList } from "./IReadingList";
import { IBanner } from "./IBanner";
import { IGoogleBook } from "./IGoogleBook";

export interface IApiResponse {
  googleBooks: {
    items?: IGoogleBook[],
    errors?: IError["errors"],
  },
  readingList: {
    data?: IReadingList["readingList"],
    user?: IUser["user"],
    error?: IBanner
  }
}

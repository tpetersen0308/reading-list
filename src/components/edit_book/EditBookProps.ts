import { IEvent } from "../../types/IEvent";
import { IApiResponse } from "../../types/IApiResponse";
import { Dispatch, SetStateAction } from "react";
import { IReadingList } from "../../types/IReadingList";
import ApiHandler from "../../utilities/api_handler/ApiHandler";

export
  interface EditBookProps {
  bookId: string,
  readingListId?: string,
  setReadingList?: Dispatch<SetStateAction<IReadingList["readingList"] | null>>,
  listLength: number,
  handleChange: (event: IEvent["changeEvent"], bookId: string) => Promise<IApiResponse["readingList"]>,
  apiHandler: ApiHandler
}
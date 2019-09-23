import { IEvent } from "../../types/IEvent";
import { IApiResponse } from "../../types/IApiResponse";

export
  interface EditBookProps {
  bookId: string,
  listLength: number,
  handleChange: (event: IEvent["changeEvent"], bookId: string) => Promise<IApiResponse["readingList"]>
}
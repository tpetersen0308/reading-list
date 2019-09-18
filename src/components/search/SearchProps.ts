import { IEvent } from "../../types/IEvent";

export interface SearchProps {
  submit: (event: IEvent["buttonEvent"]) => void,
  handleTitleChange: (event: IEvent["formEvent"]) => void,
  handleAuthorChange: (event: IEvent["formEvent"]) => void,
}
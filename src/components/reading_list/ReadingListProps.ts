import { IUser } from "../../types/IUser";
import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { RouteComponentProps } from "react-router";

export interface ReadingListProps extends RouteComponentProps<{ guid: string }> {
  user: IUser["user"],
  setUser: IUser["setUser"],
  apiHandler: ApiHandler,
}
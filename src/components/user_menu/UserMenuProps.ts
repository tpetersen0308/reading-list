import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IUser } from "../../types/IUser";

export interface UserMenuProps {
  user: IUser["user"],
  setUser: IUser["setUser"],
  apiHandler: ApiHandler
}
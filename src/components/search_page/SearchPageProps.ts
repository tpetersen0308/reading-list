import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IUser } from "../../types/IUser";

export interface SearchPageProps {
  user: IUser["user"] | null,
  setUser: IUser["setUser"],
  apiHandler: ApiHandler,
}
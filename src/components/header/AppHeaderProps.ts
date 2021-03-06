import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IUser } from "../../types/IUser";
import { IError } from "../../types/IError";

export interface AuthenticatedHeaderProps {
  user: IUser["user"],
  setUser: IUser["setUser"],
  apiHandler: ApiHandler
}

export interface UnauthenticatedHeaderProps {
  setUser: IUser["setUser"],
  setErrors: IError["setErrors"],
  apiHandler: ApiHandler
}
import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { IUser } from "../../types/IUser";
import { IError } from "../../types/IError";

export interface LoginProps {
  apiHandler: ApiHandler,
  setUser: IUser["setUser"],
  setErrors: IError["setErrors"],
}
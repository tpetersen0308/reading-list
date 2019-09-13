import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { Dispatch, SetStateAction } from "react";
import { AppHeaderProps } from "../header/AppHeaderProps";
import { ErrorsListProps } from "../error/ErrorsListProps";

export interface LoginProps {
  apiHandler: ApiHandler,
  setUser: Dispatch<SetStateAction<AppHeaderProps["user"] | null>>,
  setErrors: Dispatch<SetStateAction<ErrorsListProps | null>>,
}
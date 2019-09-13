import ApiHandler from "../../utilities/api_handler/ApiHandler";
import { Dispatch, SetStateAction } from "react";
import { ErrorsListProps } from "../error/ErrorsListProps";

export interface AppHeaderProps {
  apiHandler: ApiHandler,
  user: {
    avatar: string,
  } | null,
}

export interface AuthenticatedHeaderProps {
  user: {
    avatar: string,
  } | null,
  setUser: Dispatch<SetStateAction<AppHeaderProps["user"] | null>>,
  apiHandler: ApiHandler
}

export interface UnauthenticatedHeaderProps {
  setUser: Dispatch<SetStateAction<AppHeaderProps["user"] | null>>,
  setErrors: Dispatch<SetStateAction<ErrorsListProps | null>>,
  apiHandler: ApiHandler
}
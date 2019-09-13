import { Dispatch, SetStateAction } from "react";
import { AppHeaderProps } from "../header/AppHeaderProps";
import ApiHandler from "../../utilities/api_handler/ApiHandler";

export interface UserMenuProps {
  user: {
    avatar: string
  } | null,
  setUser: Dispatch<SetStateAction<AppHeaderProps["user"] | null>>,
  apiHandler: ApiHandler
}
import { IBanner } from "./IBanner";
import { Dispatch, SetStateAction } from "react";

export interface IError {
  errors: IBanner[],
  setErrors: Dispatch<SetStateAction<IError["errors"] | null>>,
}
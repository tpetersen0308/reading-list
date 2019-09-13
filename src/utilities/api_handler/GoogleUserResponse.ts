import { ErrorProps } from "../../components/error/ErrorProps";

export interface GoogleUserResponse {
  user?: {
    email: string,
    avatar: string,
    id: string
  }
  errors?: ErrorProps[]
}
import { FormControlProps } from "react-bootstrap";

export interface IEvent {
  formEvent: React.FormEvent<FormControlProps>,
  buttonEvent: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  changeEvent: React.ChangeEvent<HTMLOptionElement>,
  linkEvent: React.MouseEvent<HTMLAnchorElement, MouseEvent>
}
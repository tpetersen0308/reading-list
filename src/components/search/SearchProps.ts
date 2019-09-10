import { FormControlProps } from "react-bootstrap";
import React from "react";

export interface SearchProps {
  submit: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void,
  handleTitleChange: (event: React.FormEvent<FormControlProps>) => void,
}
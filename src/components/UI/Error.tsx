import React from "react";
import { ErrorProps } from "./ErrorProps";
import "./Error.css";

const Error: React.SFC<ErrorProps> = (props: ErrorProps) => (
  <p className="error">Error: {props.message}</p>
)

export default Error;
import React from "react";
import Error from "./Error";
import { ErrorsListProps } from "./ErrorsListProps";

const ErrorsList: React.FC<ErrorsListProps> = (props: ErrorsListProps) => {
  return (
    <div className="errors-list">
      {props.errors.map(error => <Error {...error} />)}
    </div>
  )
}

export default ErrorsList;
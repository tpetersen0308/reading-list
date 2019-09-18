import React from "react";
import Banner from "../banner/Banner";
import { IBanner } from "../../types/IBanner";

const ErrorsList: React.FC<{ errors: IBanner[] }> = ({ errors }) => {
  return (
    <div className="errors-list">
      {errors.map(error => <Banner type="error" {...error} />)}
    </div>
  )
}

export default ErrorsList;
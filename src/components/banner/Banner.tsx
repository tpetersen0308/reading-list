import React from "react";
import "./Banner.css";
import { IBanner } from "../../types/IBanner";

const Banner: React.FC<IBanner> = ({ type, message }) => (
  <p className={type}>{message}</p>
)

export default Banner;
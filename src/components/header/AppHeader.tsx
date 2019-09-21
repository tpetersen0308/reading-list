import React from "react";
import { Card } from "react-bootstrap";
import Login from "../login/Login";
import UserMenu from "../user_menu/UserMenu";
import "./AppHeader.css";
import { UnauthenticatedHeaderProps, AuthenticatedHeaderProps } from "./AppHeaderProps";

const BasicHeader: React.FC = ({ children }) => (
  <Card.Header id="app-header" as="h2">
    Reading List
    {children}
  </Card.Header>
);

export const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({ user, setUser, apiHandler }) => {
  return (
    <BasicHeader>
      <UserMenu user={user} setUser={setUser} apiHandler={apiHandler} />
    </BasicHeader>
  )
}

export const UnauthenticatedHeader: React.FC<UnauthenticatedHeaderProps> = ({ setUser, setErrors, apiHandler }) => {
  return (
    <BasicHeader>
      <Login apiHandler={apiHandler} setUser={setUser} setErrors={setErrors} />
    </BasicHeader>
  )
}

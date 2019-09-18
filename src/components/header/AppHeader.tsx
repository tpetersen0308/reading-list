import React from "react";
import { Card } from "react-bootstrap";
import Login from "../login/Login";
import UserMenu from "../user_menu/UserMenu";
import "./AppHeader.css";
import { AppHeaderProps, UnauthenticatedHeaderProps, AuthenticatedHeaderProps } from "./AppHeaderProps";

const BasicHeader: React.FC = ({ children }) => (
  <Card.Header id="app-header" as="h2">
    Reading List
    {children}
  </Card.Header>
);

const AuthenticatedHeader: React.FC<AuthenticatedHeaderProps> = ({ user, setUser, apiHandler }) => {
  return (
    <BasicHeader>
      <UserMenu user={user} setUser={setUser} apiHandler={apiHandler} />
    </BasicHeader>
  )
}

const UnauthenticatedHeader: React.FC<UnauthenticatedHeaderProps> = ({ setUser, setErrors, apiHandler }) => {
  return (
    <BasicHeader>
      <Login apiHandler={apiHandler} setUser={setUser} setErrors={setErrors} />
    </BasicHeader>
  )
}

const AppHeader: React.FC<AppHeaderProps> = ({ apiHandler, user, setUser, setErrors }) => {
  return (
    <>
      {user ?
        <AuthenticatedHeader user={user} setUser={setUser} apiHandler={apiHandler} />
        :
        <UnauthenticatedHeader setUser={setUser} apiHandler={apiHandler} setErrors={setErrors} />}
    </>
  )
}
export default AppHeader;
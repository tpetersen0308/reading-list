import React, { useState } from "react";
import { Card } from "react-bootstrap";
import Login from "../login/Login";
import UserMenu from "../user_menu/UserMenu";
import "./AppHeader.css";
import { AppHeaderProps, UnauthenticatedHeaderProps, AuthenticatedHeaderProps } from "./AppHeaderProps";
import { ErrorsListProps } from "../error/ErrorsListProps";
import ErrorsList from "../error/ErrorsList";

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

const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
  const [user, setUser] = useState<AppHeaderProps["user"] | null>(props.user);
  const [errors, setErrors] = useState<ErrorsListProps | null>(null);

  return (
    <>
      {user ?
        <AuthenticatedHeader user={user} setUser={setUser} apiHandler={props.apiHandler} />
        :
        <UnauthenticatedHeader setUser={setUser} apiHandler={props.apiHandler} setErrors={setErrors} />}
      {errors && <ErrorsList {...errors} />}
    </>
  )
}
export default AppHeader;
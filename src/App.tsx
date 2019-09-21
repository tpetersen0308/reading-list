import React, { useState } from "react";
import "./App.css";
import SearchPage from "./components/search_page/SearchPage";
import ApiHandler from "./utilities/api_handler/ApiHandler";
import { UnauthenticatedHeader, AuthenticatedHeader } from "./components/header/AppHeader";
import ErrorsList from "./components/errors_list/ErrorsList";
import { IError } from "./types/IError";
import { IUser } from "./types/IUser";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IBanner } from "./types/IBanner";
import ReadingList from "./components/reading_list/ReadingList";

const App: React.FC<AppProps> = ({ user, apiHandler }) => {
  const [currentUser, setCurrentUser] = useState<IUser["user"] | null>(user);
  const [errors, setErrors] = useState<IError["errors"] | null>(null);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      {currentUser
        ? <AuthenticatedApp user={currentUser} setUser={setCurrentUser} errors={errors} apiHandler={apiHandler} />
        : <UnauthenticatedApp setUser={setCurrentUser} errors={errors} setErrors={setErrors} apiHandler={apiHandler} />}
    </div>
  );
}

const AuthenticatedApp: React.FC<AuthenticatedAppProps> = ({ user, setUser, errors, apiHandler }) => (
  <div className="authenticated-app">
    <AuthenticatedHeader user={user} setUser={setUser} apiHandler={apiHandler} />
    {errors && <ErrorsList errors={errors} />}
    <Router>
      <Switch>
        <Route exact path="/" render={() => <SearchPage user={user} setUser={setUser} apiHandler={apiHandler} />} />
        <Route exact path="/reading-list/:guid" render={(props) => <ReadingList user={user} setUser={setUser} apiHandler={apiHandler} {...props} />} />
      </Switch>
    </Router>
  </div>
);

const UnauthenticatedApp: React.FC<UnauthenticatedAppProps> = ({ setUser, errors, setErrors, apiHandler }) => (
  <div className="unauthenticated-app">
    <UnauthenticatedHeader setUser={setUser} setErrors={setErrors} apiHandler={apiHandler} />
    {errors && <ErrorsList errors={errors} />}
    <SearchPage apiHandler={apiHandler} user={null} setUser={setUser} />
  </div>
);

interface AppProps {
  user: IUser["user"] | null,
  apiHandler: ApiHandler,
}

interface AuthenticatedAppProps {
  user: IUser["user"],
  setUser: IUser["setUser"],
  errors: IBanner[] | null,
  apiHandler: ApiHandler,
}

interface UnauthenticatedAppProps {
  setUser: IUser["setUser"],
  errors: IBanner[] | null,
  setErrors: IError["setErrors"],
  apiHandler: ApiHandler,
}

export default App;

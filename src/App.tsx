import React, { useState } from "react";
import "./App.css";
import SearchPage from "./components/search_page/SearchPage";
import ApiHandler from "./utilities/api_handler/ApiHandler";
import AppHeader from "./components/header/AppHeader";
import { currentUser } from "./utilities/userSession";
import ErrorsList from "./components/errors_list/ErrorsList";
import { IError } from "./types/IError";
import { IUser } from "./types/IUser";

const apiHandler: ApiHandler = new ApiHandler();

const App: React.FC = () => {
  const [user, setUser] = useState<IUser["user"] | null>(currentUser());
  const [errors, setErrors] = useState<IError["errors"] | null>(null);

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <AppHeader apiHandler={apiHandler} user={user} setUser={setUser} setErrors={setErrors} />
      {errors && <ErrorsList errors={errors} />}
      <SearchPage apiHandler={apiHandler} />
    </div>
  );
}

export default App;

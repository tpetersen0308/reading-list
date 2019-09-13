import React from "react";
import "./App.css";
import SearchPage from "./components/search_page/SearchPage";
import ApiHandler from "./utilities/api_handler/ApiHandler";
import AppHeader from "./components/header/AppHeader";

const apiHandler: ApiHandler = new ApiHandler();
const user: string | null = localStorage.getItem("user");

const App: React.FC = () => {

  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <AppHeader apiHandler={apiHandler} user={user ? JSON.parse(user) : ""} />
      <SearchPage apiHandler={apiHandler} />
    </div>
  );
}

export default App;

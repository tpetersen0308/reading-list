import React from "react";
import "./App.css";
import SearchPage from "./components/search_page/SearchPage";
import GoogleApiHandler from "./utilities/ApiHandler/GoogleApiHandler";
import { Card } from "react-bootstrap";

const apiHandler: GoogleApiHandler = new GoogleApiHandler();

const App: React.FC = () => {
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
      <Card.Header id="app-header" as="h2">
        Reading List
        <br />
      </Card.Header><br />
      <SearchPage apiHandler={apiHandler} />
    </div>
  );
}

export default App;

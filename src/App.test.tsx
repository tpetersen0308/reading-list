import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { cleanup, render } from '@testing-library/react';
import { IUser } from './types/IUser';
import MockApiHandler from './utilities/api_handler/MockApiHandler';

describe("App", () => {
  afterEach(cleanup);

  it("renders without crashing", () => {
    const user: IUser["user"] = {
      avatar: "user avatar",
      readingLists: []
    };

    const apiHandler: MockApiHandler = new MockApiHandler({});

    const div = document.createElement('div');
    ReactDOM.render(<App user={user} apiHandler={apiHandler} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it("renders authenticated app when there is a user", () => {
    const user: IUser["user"] = {
      avatar: "user avatar",
      readingLists: []
    };

    const apiHandler: MockApiHandler = new MockApiHandler({});

    const { getByAltText } = render(<App user={user} apiHandler={apiHandler} />);

    getByAltText("avatar");
  });

  it("renders unauthenticated app when there is no user", () => {
    const apiHandler: MockApiHandler = new MockApiHandler({});

    const { getByText } = render(<App user={null} apiHandler={apiHandler} />);

    getByText("Google Login");
  });
})

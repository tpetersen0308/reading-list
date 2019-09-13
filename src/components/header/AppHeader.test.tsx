import React from "react";
import AppHeader from "./AppHeader";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

describe("AppHeader", () => {
  afterEach(cleanup);

  it("Renders authenticated header when there is a user", () => {
    const user = {
      avatar: "some avatar",
    };

    const apiHandler: MockApiHandler = new MockApiHandler(user);

    const { getByAltText } = render(<AppHeader user={user} apiHandler={apiHandler} />);

    getByAltText("avatar");
  });

  it("Renders unauthenticated header when there is no user", () => {
    const apiHandler: MockApiHandler = new MockApiHandler(null);

    const { getByText } = render(<AppHeader user={null} apiHandler={apiHandler} />);

    getByText("Google Login");
  });

  it("Renders unauthenticated header when user logs out", async () => {
    const user = {
      avatar: "some avatar",
    };

    const apiHandler: MockApiHandler = new MockApiHandler(user);

    const { getByText, getByAltText } = render(<AppHeader user={user} apiHandler={apiHandler} />);

    fireEvent.click(getByAltText("avatar"));
    fireEvent.click(getByText("Log Out"));

    await wait(() => {
      getByText("Google Login");
    })
  });
});
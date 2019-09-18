import React, { Dispatch, SetStateAction } from "react";
import AppHeader from "./AppHeader";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { render, cleanup } from "@testing-library/react";
import { AppHeaderProps } from "./AppHeaderProps";
import { IBanner } from "../../types/IBanner";

describe("AppHeader", () => {
  afterEach(cleanup);

  let setUser: Dispatch<SetStateAction<AppHeaderProps["user"] | null>>;
  let setErrors: Dispatch<SetStateAction<IBanner[] | null>>;

  beforeEach(() => {
    setUser = jest.fn();
    setErrors = jest.fn();
  });

  it("Renders authenticated header when there is a user", () => {
    const user = {
      avatar: "some avatar",
    };

    const apiHandler: MockApiHandler = new MockApiHandler(user);

    const { getByAltText } = render(<AppHeader apiHandler={apiHandler} user={user} setUser={setUser} setErrors={setErrors} />);

    getByAltText("avatar");
  });

  it("Renders unauthenticated header when there is no user", () => {
    const apiHandler: MockApiHandler = new MockApiHandler(null);

    const { getByText } = render(<AppHeader apiHandler={apiHandler} user={null} setUser={setUser} setErrors={setErrors} />);

    getByText("Google Login");
  });
});
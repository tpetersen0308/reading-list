import React from "react";
import { IUser } from "../../types/IUser";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import UserMenu from "./UserMenu";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";

describe("UserMenu", () => {
  afterEach(cleanup);

  const apiHandler = new MockApiHandler({});

  it("displays logout when user clicks their avatar", async () => {
    const user: IUser["user"] = {
      avatar: "",
      readingLists: []
    };

    const { getByText, getByAltText } = render(<UserMenu user={user} apiHandler={apiHandler} setUser={jest.fn()} />);

    fireEvent.click(getByAltText(/avatar/i));
    await wait(() => getByText(/Log Out/i));
  });

  it("displays reading lists when user clicks their avatar", async () => {
    const user: IUser["user"] = {
      avatar: "",
      readingLists: [
        {
          title: "List 1",
          readingListId: "reading list id 1",
          books: []
        },
        {
          title: "List 2",
          readingListId: "reading list id 2",
          books: []
        }
      ]
    };

    const { getByText, getByAltText } = render(<UserMenu user={user} apiHandler={apiHandler} setUser={jest.fn()} />);

    fireEvent.click(getByAltText(/avatar/i));
    await wait(() => getByText(/List 1/i));
    getByText(/List 2/i);
  });

  it("displays default message when user has no reading lists.", async () => {
    const user: IUser["user"] = {
      avatar: "",
      readingLists: []
    };

    const { getByText, getByAltText } = render(<UserMenu user={user} apiHandler={apiHandler} setUser={jest.fn()} />);

    fireEvent.click(getByAltText(/avatar/i));
    await wait(() => getByText(/You do not have any reading lists./i));
  });
})
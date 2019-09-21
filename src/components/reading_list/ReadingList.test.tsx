import React from "react";
import { cleanup, render, wait } from "@testing-library/react";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import ReadingList from "./ReadingList";
import { createMemoryHistory, createLocation } from "history";
import { IUser } from "../../types/IUser";

describe("ReadingList", () => {
  afterEach(cleanup);

  const user: IUser["user"] = {
    avatar: "",
    readingLists: []
  };

  it("gets and displays the books for a reading list", async () => {
    const data = {
      data: {
        title: "Reading List",
        readingListId: "reading-list-id",
        books: [
          {
            title: "Book 1 Title",
            authors: ["Book 1 Author 1", "Book 1 Author 2"],
            image: "Book 1 Image",
            dateCreated: "2019-09-20T17:29:28.566306"
          },
          {
            title: "Book 2 Title",
            authors: ["Book 2 Author 1", "Book 2 Author 2"],
            image: "Book 2 Image",
            dateCreated: "2019-08-20T17:29:28.566306"
          }
        ]
      }
    };

    const match = {
      isExact: false,
      path: "/reading-list/:guid",
      url: `/reading-list/${data.data.readingListId}`,
      params: {
        guid: data.data.readingListId
      }
    };
    const history = createMemoryHistory();
    const location = createLocation(match.url);

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText } = render(<ReadingList match={match} location={location} history={history} user={user} setUser={jest.fn()} apiHandler={apiHandler} />);

    await wait(() => getByText("Reading List:"));
    getByText("Book 1 Title");
    getByText("By: Book 1 Author 1, Book 1 Author 2");
    getByText("Saved on: Fri Sep 20 2019.");
    getByText("Book 2 Title");
    getByText("By: Book 2 Author 1, Book 2 Author 2");
    getByText("Saved on: Tue Aug 20 2019.");
  });

  it("renders error messages", async () => {
    const data = {
      error: {
        message: "the content could not be loaded."
      }
    };
    const match = {
      isExact: false,
      path: "/reading-list/:guid",
      url: "/reading-list/reading-list-id",
      params: {
        guid: "reading-list-id"
      }
    };

    const history = createMemoryHistory();
    const location = createLocation(match.url);

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText } = render(<ReadingList match={match} location={location} history={history} user={user} setUser={jest.fn()} apiHandler={apiHandler} />);

    await wait(() => getByText("Error: the content could not be loaded."));
  });
});
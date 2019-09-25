import React from "react";
import { cleanup, render, wait, fireEvent } from "@testing-library/react";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import ReadingList from "./ReadingList";
import { createMemoryHistory, createLocation, MemoryHistory } from "history";
import { IUser } from "../../types/IUser";
import { IApiResponse } from "../../types/IApiResponse";

describe("ReadingList", () => {
  afterEach(cleanup);

  const user: IUser["user"] = {
    avatar: "",
    readingLists: []
  };

  it("gets and displays the books for a reading list", async () => {
    const data: IApiResponse["readingList"] = {
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
      url: "/reading-list/reading-list-id",
      params: {
        guid: "reading-list-id"
      }
    };
    const history: MemoryHistory = createMemoryHistory();
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

  it("can delete a book", async () => {
    const data: IApiResponse["readingList"] = {
      data: {
        title: "Reading List",
        readingListId: "reading-list-id",
        books: [
          {
            title: "Book 1 Title",
            authors: ["Book 1 Author 1", "Book 1 Author 2"],
            image: "Book 1 Image",
            dateCreated: "2019-09-20T17:29:28.566306",
            bookId: "book 1 id",
            readingListId: "reading-list-id"
          },
          {
            title: "Book 2 Title",
            authors: ["Book 2 Author 1", "Book 2 Author 2"],
            image: "Book 2 Image",
            dateCreated: "2019-08-20T17:29:28.566306",
            bookId: "book 2 id",
            readingListId: "reading-list-id"
          }
        ]
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
    const history: MemoryHistory = createMemoryHistory();
    const location = createLocation(match.url);

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText, getByTestId, queryByText } = render(<ReadingList match={match} location={location} history={history} user={user} setUser={jest.fn()} apiHandler={apiHandler} />);

    await wait(() => getByText(/Book 2 Title/i));

    fireEvent.click(getByTestId(/book 2 id/i));

    await wait(() => getByText(/Book 1 Title/i));

    expect(queryByText(/Book 2 Title/i)).toBeNull();
  });

  it("can delete a reading list", async () => {
    const data: IApiResponse["readingList"] = {
      data: {
        title: "Reading List",
        readingListId: "reading-list-id",
        books: [
          {
            title: "Book 1 Title",
            authors: ["Book 1 Author 1", "Book 1 Author 2"],
            image: "Book 1 Image",
            dateCreated: "2019-09-20T17:29:28.566306",
            bookId: "book 1 id",
            readingListId: "reading-list-id"
          },
          {
            title: "Book 2 Title",
            authors: ["Book 2 Author 1", "Book 2 Author 2"],
            image: "Book 2 Image",
            dateCreated: "2019-08-20T17:29:28.566306",
            bookId: "book 2 id",
            readingListId: "reading-list-id"
          }
        ]
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
    const history: MemoryHistory = createMemoryHistory();
    const location = createLocation(match.url);

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText } = render(<ReadingList match={match} location={location} history={history} user={user} setUser={jest.fn()} apiHandler={apiHandler} />);

    await wait(() => getByText(/Reading List:/i));

    fireEvent.click(getByText(/Delete List/i));

    expect(history.location.pathname).toEqual("/");
  });

  it("renders error messages", async () => {
    const data: IApiResponse["readingList"] = {
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

    const history: MemoryHistory = createMemoryHistory();
    const location = createLocation(match.url);

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText } = render(<ReadingList match={match} location={location} history={history} user={user} setUser={jest.fn()} apiHandler={apiHandler} />);

    await wait(() => getByText(/Error: the content could not be loaded./));
  });
});
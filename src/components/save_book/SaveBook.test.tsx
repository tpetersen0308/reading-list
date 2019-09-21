import React from "react";
import SaveBook from "./SaveBook";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { IBook } from "../../types/IBook";
import { IUser } from "../../types/IUser";
import { IReadingList } from "../../types/IReadingList";

describe("SaveBook", () => {
  afterEach(cleanup);

  it("creates a new reading list", async () => {
    const book: IBook = {
      title: "test book title",
      authors: ["test author"],
      image: "test image"
    };

    const user: IUser["user"] = {
      avatar: "",
      readingLists: [],
    }

    const data = {
      data: {
        title: "New Reading List",
        books: [
          book
        ]
      }
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText, getByPlaceholderText } = render(<SaveBook book={book} apiHandler={apiHandler} user={user} setUser={jest.fn()} />);
    const input = getByPlaceholderText("New Reading List Title");

    fireEvent.change(input, { target: { value: "New Reading List" } });
    fireEvent.click(getByText("Add"));

    await wait(() => {
      getByText(/Saved/i);
    });
  });

  it("adds a book to an existing list", async () => {
    const book: IBook = {
      title: "test book title",
      authors: ["test author"],
      image: "test image"
    };

    const readingList: IReadingList["readingList"] = {
      title: "Existing Reading List",
      readingListId: "reading list id",
      books: [
        book,
        {
          title: "previously added book",
          authors: ["previously added book author"],
          image: "previously added book image"
        }
      ]
    };

    const user: IUser["user"] = {
      avatar: "",
      readingLists: [readingList],
    };

    const data = {
      data: readingList
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText } = render(<SaveBook book={book} apiHandler={apiHandler} user={user} setUser={jest.fn()} />);

    fireEvent.click(getByText("Select Existing"));

    await wait(() => {
      getByText("Existing Reading List");
    });
  });

  it("displays a message when there is an error", async () => {
    const book: IBook = {
      title: "test book title",
      authors: ["test author"],
      image: "test image"
    };

    const user: IUser["user"] = {
      avatar: "",
      readingLists: [],
    }

    const data = {
      error: {
        message: "test error message"
      }
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText, getByPlaceholderText } = render(<SaveBook book={book} apiHandler={apiHandler} user={user} setUser={jest.fn()} />);
    const input = getByPlaceholderText("New Reading List Title");

    fireEvent.change(input, { target: { value: "New Reading List" } });
    fireEvent.click(getByText("Add"));

    await wait(() => {
      getByText(/test error message/i);
    });
  })
});
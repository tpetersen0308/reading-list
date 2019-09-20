import React from "react";
import SaveBook from "./SaveBook";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { IBook } from "../../types/IBook";

describe("SaveBook", () => {
  afterEach(cleanup);

  it("creates a new reading list", async () => {
    const book: IBook = {
      title: "test book title",
      authors: ["test author"],
      image: "test image"
    };

    const data = {
      data: {
        title: "New Reading List",
        books: [
          book
        ]
      }
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText, getByPlaceholderText } = render(<SaveBook book={book} apiHandler={apiHandler} readingLists={null} setReadingLists={jest.fn()} />);
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

    const data = {
      data: {
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
      }
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText } = render(<SaveBook book={book} apiHandler={apiHandler} readingLists={[data.data]} setReadingLists={jest.fn()} />);

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

    const data = {
      error: {
        message: "test error message"
      }
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText, getByPlaceholderText } = render(<SaveBook book={book} apiHandler={apiHandler} readingLists={null} setReadingLists={jest.fn()} />);
    const input = getByPlaceholderText("New Reading List Title");

    fireEvent.change(input, { target: { value: "New Reading List" } });
    fireEvent.click(getByText("Add"));

    await wait(() => {
      getByText(/test error message/i);
    });
  })
});
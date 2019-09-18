import React from "react";
import SaveBook from "./SaveBook";
import { render, cleanup, fireEvent, wait } from "@testing-library/react";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { IBook } from "../../types/IBook";

describe("SaveBookButton", () => {
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
    }

    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText, getByLabelText } = render(<SaveBook book={book} apiHandler={apiHandler} />);
    const input = getByLabelText("Add to Reading List:");

    fireEvent.change(input, { target: { value: "New Reading List" } });
    fireEvent.click(getByText("Add"));

    await wait(() => {
      getByText(/Saved/i);
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

    const { getByText, getByLabelText } = render(<SaveBook book={book} apiHandler={apiHandler} />);
    const input = getByLabelText("Add to Reading List:");

    fireEvent.change(input, { target: { value: "New Reading List" } });
    fireEvent.click(getByText("Add"));

    await wait(() => {
      getByText(/test error message/i);
    });


  })
});
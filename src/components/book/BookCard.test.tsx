import React from "React";
import BookCard from "./BookCard";
import { BookCardProps } from "./BookCardProps";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { cleanup, render } from "@testing-library/react";

describe("BookCard", () => {
  afterEach(cleanup);

  it("can be saved if a user is logged in", () => {
    const apiHandler: MockApiHandler = new MockApiHandler({});
    const book: BookCardProps = {
      book: {
        title: "test book title",
        authors: ["test author"],
        image: "test image",
      },
      apiHandler: apiHandler,
      readingLists: null,
      setReadingLists: jest.fn(),
      authenticated: true
    };

    const { getByPlaceholderText } = render(<BookCard {...book} />);

    getByPlaceholderText("New Reading List Title");
  });
})

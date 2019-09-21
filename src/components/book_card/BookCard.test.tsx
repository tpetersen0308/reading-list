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
      user: {
        avatar: "",
        readingLists: []
      },
      setUser: jest.fn(),
      searchMode: true
    };

    const { getByPlaceholderText } = render(<BookCard {...book} />);

    getByPlaceholderText("New Reading List Title");
  });

  it("displays the date added when viewed in a reading list", () => {
    const apiHandler: MockApiHandler = new MockApiHandler({});
    const book: BookCardProps = {
      book: {
        title: "test book title",
        authors: ["test author"],
        image: "test image",
        dateCreated: "2019-08-20T17:29:28.566306"
      },
      apiHandler: apiHandler,
      user: null,
      setUser: jest.fn(),
      searchMode: false
    };

    const { getByText } = render(<BookCard {...book} />);

    getByText("Saved on: Tue Aug 20 2019.");
  })
})

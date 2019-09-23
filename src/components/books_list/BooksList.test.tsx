import React from "react";
import { cleanup, render } from "@testing-library/react";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import BooksList from "./BooksList";

describe("BooksList", () => {
  afterEach(cleanup);

  it("renders books with save menu when a user is logged in and in search mode", () => {
    const booksListProps = {
      books: [
        {
          title: "test title",
          authors: ["test author"],
          image: "test image"
        }
      ],
      user: {
        avatar: "",
        readingLists: []
      },
      setUser: jest.fn(),
      apiHandler: new MockApiHandler({}),
      searchMode: true,
    };

    const { getByText } = render(<BooksList {...booksListProps} />);

    getByText("Select Existing");
    getByText("Add");
  });

  it("renders books with edit form when a user is logged in and there are edit props", () => {
    const booksListProps = {
      books: [
        {
          title: "test title",
          authors: ["test author"],
          image: "test image",
          bookId: "test book id"
        }
      ],
      user: {
        avatar: "",
        readingLists: []
      },
      setUser: jest.fn(),
      apiHandler: new MockApiHandler({}),
      searchMode: false,
      handleUpdate: jest.fn()
    };

    const { getByText } = render(<BooksList {...booksListProps} />);

    getByText("Change Ranking");
  });
});
import React from "React";
import BookCard from "./BookCard";
import { BookCardProps } from "./BookCardProps";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { cleanup, render } from "@testing-library/react";

describe("Book", () => {
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
      authenticated: true
    };

    const { getByText } = render(<BookCard {...book} />);

    getByText("Add to Reading List:");
  });
})

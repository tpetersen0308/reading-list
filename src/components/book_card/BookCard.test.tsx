import React from "React";
import BookCard from "./BookCard";
import { BookCardProps } from "./BookCardProps";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { cleanup, render } from "@testing-library/react";

describe("BookCard", () => {
  afterEach(cleanup);

  it("displays the date added when viewed in a reading list", () => {
    const book: BookCardProps = {
      book: {
        title: "test book title",
        authors: ["test author"],
        image: "test image",
        dateCreated: "2019-08-20T17:29:28.566306"
      },
    };

    const { getByText } = render(<BookCard {...book} />);

    getByText("Saved on: Tue Aug 20 2019.");
  });
});

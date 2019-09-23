import React from "react";
import { cleanup, render, fireEvent, wait } from "@testing-library/react";
import EditBook from "./EditBook";

describe("EditBook", () => {
  afterEach(cleanup);

  it("displays a menu to select a ranking", async () => {
    const { getByText } = render(<EditBook bookId="book id" listLength={10} handleChange={jest.fn()} />);

    fireEvent.click(getByText("Change Ranking"));
    await wait(() => getByText("10"));
  })
})
import React from "react";
import { cleanup, render, fireEvent, wait } from "@testing-library/react";
import EditBook from "./EditBook";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { IApiResponse } from "../../types/IApiResponse";

describe("EditBook", () => {
  afterEach(cleanup);

  it("has a menu to select a ranking", () => {
    const { getByText } = render(<EditBook
      setReadingList={jest.fn()}
      readingListId="reading list id"
      bookId="book id"
      listLength={10}
      apiHandler={new MockApiHandler({})}
      handleChange={jest.fn()} />);

    fireEvent.click(getByText(/Change Ranking/i));
    getByText(/10/i);
  });

  it("renders errors", async () => {
    const data: IApiResponse["readingList"] = {
      error: {
        message: "error message"
      }
    };
    const apiHandler: MockApiHandler = new MockApiHandler(data);

    const { getByText } = render(<EditBook
      setReadingList={jest.fn()}
      readingListId="reading list id"
      bookId="book id"
      listLength={10}
      apiHandler={apiHandler}
      handleChange={jest.fn()} />);

    fireEvent.click(getByText(/remove from list/i));

    await wait(() => getByText(/Error: error message/i));
  });
})
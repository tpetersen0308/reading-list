import React from "react";
import SearchPage from "./SearchPage";
import { cleanup, render, fireEvent, wait } from "@testing-library/react";
import MockApiHandler from "../../utilities/api_handler/MockApiHandler";
import { IApiResponse } from "../../types/IApiResponse";

describe("SearchPage", () => {
  afterEach(cleanup);

  it("can get search results by title", async () => {
    const data: IApiResponse["googleBooks"] = {
      items: [
        {
          volumeInfo: {
            title: "test book 1",
            authors: ["some author", "some other author"],
            imageLinks: {
              thumbnail: "image-thumbnail"
            }
          }
        },
      ]
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);
    const { getByText, getByLabelText } = render(<SearchPage apiHandler={apiHandler} user={null} setUser={jest.fn()} />);
    const input = getByLabelText(/title/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "test book 1" } });
    fireEvent.click(getByText("Search"));

    await wait(() => {
      getByText(/test book 1/i);
    })
    getByText(/some author/i);
    getByText(/some other author/i);
  });

  it("can get search results by author", async () => {
    const data: IApiResponse["googleBooks"] = {
      items: [
        {
          volumeInfo: {
            title: "test book 1",
            authors: ["some author", "some other author"],
            imageLinks: {
              thumbnail: "image-thumbnail"
            }
          }
        },
      ]
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);
    const { getByText, getByLabelText } = render(<SearchPage apiHandler={apiHandler} user={null} setUser={jest.fn()} />);
    const input = getByLabelText(/author/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "some author" } });
    fireEvent.click(getByText("Search"));

    await wait(() => {
      getByText(/test book 1/i);
    })
    getByText(/some author/i);
    getByText(/some other author/i);
  });

  it("can handle errors", async () => {
    const error: IApiResponse["googleBooks"] = {
      errors: [
        {
          message: "test error message",
        }
      ]
    };

    const apiHandler: MockApiHandler = new MockApiHandler(error);
    const { getByText, getByLabelText } = render(<SearchPage apiHandler={apiHandler} user={null} setUser={jest.fn()} />);
    const input = getByLabelText(/title/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test book 1" } });
    fireEvent.click(getByText("Search"));

    await wait(() => {
      getByText(/test error message/i);
    })
  })

  it("does not allow empty searches", () => {
    const apiHandler: MockApiHandler = new MockApiHandler({});
    const { getByText } = render(<SearchPage apiHandler={apiHandler} user={null} setUser={jest.fn()} />);
    fireEvent.click(getByText("Search"));

    getByText(/you must include a search term/i);
  })
})
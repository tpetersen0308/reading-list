import React from "react";
import SearchPage from "./SearchPage";
import { cleanup, render, fireEvent, wait } from "@testing-library/react";
import MockGoogleApiHandler from "../../utilities/ApiHandler/MockGoogleApiHandler";
import { GoogleBooksResponse } from "../../utilities/ApiHandler/GoogleBooksResponse";

describe("SearchPage", () => {
  afterEach(cleanup);

  it("can get search results by title", async () => {
    const data: GoogleBooksResponse = {
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

    const apiHandler: MockGoogleApiHandler = new MockGoogleApiHandler(data);
    const { getByText, getByLabelText } = render(<SearchPage apiHandler={apiHandler} />);
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
    const data: GoogleBooksResponse = {
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

    const apiHandler: MockGoogleApiHandler = new MockGoogleApiHandler(data);
    const { getByText, getByLabelText } = render(<SearchPage apiHandler={apiHandler} />);
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
    const error: GoogleBooksResponse = {
      errors: [
        {
          message: "test error message",
        }
      ]
    };

    const apiHandler: MockGoogleApiHandler = new MockGoogleApiHandler(error);
    const { getByText, getByLabelText } = render(<SearchPage apiHandler={apiHandler} />);
    const input = getByLabelText(/title/i) as HTMLInputElement;
    fireEvent.change(input, { target: { value: "test book 1" } });
    fireEvent.click(getByText("Search"));

    await wait(() => {
      getByText(/error: test error message/i);
    })
  })

  it("does not allow empty searches", () => {
    const apiHandler: MockGoogleApiHandler = new MockGoogleApiHandler({});
    const { getByText } = render(<SearchPage apiHandler={apiHandler} />);
    fireEvent.click(getByText("Search"));

    getByText(/error: you must include a search term/i);
  })
})
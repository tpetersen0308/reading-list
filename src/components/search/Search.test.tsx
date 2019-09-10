import React from "react";
import Search from "./Search";
import { cleanup, render, fireEvent } from "@testing-library/react";

describe("Search", () => {
  afterEach(cleanup);

  test("can handle title input", () => {
    const mockSubmit = jest.fn();
    const mockInputHandler = jest.fn();
    const component = render(<Search submit={mockSubmit} handleTitleChange={mockInputHandler} />)
    const input = component.getByLabelText(/title/i) as HTMLInputElement;

    fireEvent.change(input, { target: { value: "some title" } })

    expect(input.value).toBe("some title");
  })
})
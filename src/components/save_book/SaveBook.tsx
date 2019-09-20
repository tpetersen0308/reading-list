import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { SaveBookProps } from "./SaveBookProps";
import { IBanner } from "../../types/IBanner";
import Banner from "../banner/Banner";
import { IApiResponse } from "../../types/IApiResponse";
import { IEvent } from "../../types/IEvent";
import "./SaveBook.css";
import { IReadingList } from "../../types/IReadingList";

const SaveBook: React.FC<SaveBookProps> = ({ book, readingLists, setReadingLists, apiHandler }) => {
  const [title, setTitle] = useState<string>("");
  const [success, setSuccess] = useState<IBanner | null>(null);
  const [error, setError] = useState<IBanner | null>(null);

  const handleTitleChange = (event: IEvent["formEvent"]): void => {
    const { value } = event.target as HTMLInputElement;
    setTitle(value);
  }

  const handleCreate = async (event: IEvent["buttonEvent"]): Promise<IApiResponse["readingList"]> => {
    event.preventDefault();
    const { data, error } = await apiHandler.post("/readinglist", {
      title: title,
      books: [book]
    });
    if (data) {
      const newReadingLists: IReadingList["readingList"][] = readingLists ? [data].concat(readingLists) : [data];
      setReadingLists(newReadingLists);
    }
    return handleResponse(data, error);
  }

  const handleUpdate = async (event: IEvent["changeEvent"]): Promise<IApiResponse["readingList"]> => {
    const readingListId: string = event.target.value;
    const { data, error } = await apiHandler.put(`/readinglist/${readingListId}`, book);
    return handleResponse(data, error);
  }

  const handleResponse = (data?: IReadingList["readingList"], error?: IBanner): IApiResponse["readingList"] => {
    if (data) {
      setSuccess({ type: "success", message: "Saved" });
      setError(null);
    } else if (error) {
      setError({ type: "error", message: error.message });
    }

    return { data };
  }

  return (
    <Form className="save-book-form">
      <Form.Group>
        {success && <Banner {...success} />}
        {error && <Banner {...error} />}
        <Form.Label>Add to Reading List:</Form.Label>
        <Form.Control
          size="sm"
          className={`new-list-title-field`}
          type="text"
          placeholder="New Reading List Title"
          onChange={handleTitleChange} />
        <Form.Control size="sm" onChange={handleUpdate} className="list-title-select" as="select">
          <option disabled selected>Select Existing</option>
          {readingLists && readingLists.map(r => {
            return <option value={r.readingListId} >{r.title}</option>
          })}
        </Form.Control>
      </Form.Group>
      <Button size="sm" type="submit" onClick={handleCreate}>Add</Button>
    </Form>
  )
}

export default SaveBook;
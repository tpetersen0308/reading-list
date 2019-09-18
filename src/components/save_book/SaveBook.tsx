import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { SaveBookProps } from "./SaveBookProps";
import { IBanner } from "../../types/IBanner";
import Banner from "../banner/Banner";
import { IApiResponse } from "../../types/IApiResponse";
import { IEvent } from "../../types/IEvent";

const SaveBook: React.FC<SaveBookProps> = (props: SaveBookProps) => {
  const [title, setTitle] = useState<string>("");
  const [success, setSuccess] = useState<IBanner | null>(null);
  const [error, setError] = useState<IBanner | null>(null);

  const handleTitleChange = (event: IEvent["formEvent"]): void => {
    const { value } = event.target as HTMLInputElement;
    setTitle(value);
  }

  const handleSubmit = async (event: IEvent["buttonEvent"]): Promise<IApiResponse["readingList"]> => {
    event.preventDefault();
    const { data, error } = await props.apiHandler.post("/readinglist", {
      title: title,
      books: [props.book]
    });
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
        <Form.Label htmlFor="new-list-title-field">Add to Reading List:</Form.Label>
        <Form.Control id="new-list-title-field" type="text" placeholder="Title" onChange={handleTitleChange} />
      </Form.Group>
      <Button type="submit" onClick={handleSubmit}>Add</Button>
    </Form>
  )
}

export default SaveBook;
import React, { useState } from "react";
import { IEvent } from "../../types/IEvent";
import { IApiResponse } from "../../types/IApiResponse";
import { Form, Button } from "react-bootstrap";
import { EditBookProps } from "./EditBookProps";
import { IBanner } from "../../types/IBanner";
import Banner from "../banner/Banner";

const EditBook: React.FC<EditBookProps> = ({ bookId, readingListId, setReadingList, listLength, handleChange, apiHandler }) => {
  const [error, setError] = useState<IBanner | null>(null);

  const localChangeHandler = async (event: IEvent["changeEvent"]): Promise<IApiResponse["readingList"]> => {
    return handleChange(event, bookId);
  }

  const getRankingOptions = () => {
    const rankings: number[] = Array.from(Array(listLength).keys()).map(r => ++r);
    return rankings.map(ranking => {
      return <option key={ranking} value={ranking} >{ranking}</option>
    });
  }

  const handleDelete = async (event: IEvent["buttonEvent"]): Promise<IApiResponse["readingList"]> => {
    event.preventDefault();
    const { data, error } = await apiHandler.delete(`/readinglist/${readingListId}/${bookId}`);
    if (data && setReadingList) {
      setReadingList(data);
      setError(null)
    } else if (error) {
      setError({ type: "error", message: error.message });
    }
    return { data };
  }

  return (
    <div className="edit-book-form">
      {error && <Banner type="error" message={"Error: " + error.message} />}
      <Form>
        <Form.Group>
          <Form.Control size="sm" onChange={localChangeHandler} defaultValue="default" className="new-ranking-select" as="select">
            <option disabled value="default">Change Ranking</option>
            {getRankingOptions()}
          </Form.Control>
        </Form.Group>
        <Button data-testid={bookId} size="sm" type="submit" onClick={handleDelete}>Remove From List</Button>
      </Form>
    </div>
  )
}

export default EditBook;
import React from "react";
import { IEvent } from "../../types/IEvent";
import { IApiResponse } from "../../types/IApiResponse";
import { Form } from "react-bootstrap";
import { EditBookProps } from "./EditBookProps";

const EditBook: React.FC<EditBookProps> = ({ bookId, listLength, handleChange }) => {
  const localChangeHandler = async (event: IEvent["changeEvent"]): Promise<IApiResponse["readingList"]> => {
    return handleChange(event, bookId);
  }

  const getRankings = (): number[] => {
    return Array.from(Array(listLength).keys()).map(r => ++r);
  }

  return (
    <Form>
      <Form.Group>
        <Form.Control size="sm" onChange={localChangeHandler} defaultValue="default" className="new-ranking-select" as="select">
          <option disabled value="default">Change Ranking</option>
          {getRankings().map(ranking => {
            return <option key={ranking} value={ranking} >{ranking}</option>
          })}
        </Form.Control>
      </Form.Group>
    </Form>
  )
}

export default EditBook;
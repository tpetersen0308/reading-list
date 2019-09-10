import React from "react";
import { BookProps } from "./BookProps";
import { Card } from "react-bootstrap";
import "./Book.css";

const Book: React.SFC<BookProps> = (props: BookProps) => {
  return (
    <Card className="book-card">
      <Card.Img variant="top" src={props.image} />
      <Card.Title>{props.title}</Card.Title>
      <Card.Text>
        By: {props.authors.join(", ")}
      </Card.Text>
    </Card>
  )
}

export default Book;
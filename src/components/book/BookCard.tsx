import React from "react";
import { BookCardProps } from "./BookCardProps";
import { Card, CardGroup } from "react-bootstrap";
import SaveBook from "../save_book/SaveBook";
import "./BookCard.css";

const BookCard: React.FC<BookCardProps> = ({ book, apiHandler, readingLists, setReadingLists, authenticated }) => {
  const { title, authors, image } = book;
  return (
    <CardGroup className="book-card-group">
      <Card className="book-image-card">
        <Card.Img variant="top" src={image} alt="Image Not Available" />
      </Card>
      <Card className="book-info-card">
        <Card.Title>{title}</Card.Title>
        <Card.Text>
          By: {authors.join(", ")}
        </Card.Text>
        {authenticated &&
          <SaveBook
            book={{
              title: title,
              authors: authors,
              image: image
            }}
            readingLists={readingLists}
            setReadingLists={setReadingLists}
            apiHandler={apiHandler}
          />}
      </Card>
    </CardGroup>
  )
}

BookCard.defaultProps = {
  book: {
    title: "Title Unavailable",
    authors: ["Author Unavailable"],
  }
}
export default BookCard;
import React from "react";
import { BookCardProps } from "./BookCardProps";
import { Card, CardGroup } from "react-bootstrap";
import "./BookCard.css";

const BookCard: React.FC<BookCardProps> = ({ book, children }) => {
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
        {book.dateCreated &&
          <Card.Text>Saved on: {new Date(book.dateCreated).toDateString()}.</Card.Text>}
        {children}
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
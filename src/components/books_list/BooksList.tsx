import React from 'react';
import { BooksListProps } from "./BooksListProps";
import Book from "../book/Book";
import "./BooksList.css";

const BooksList: React.SFC<BooksListProps> = (props: BooksListProps) => {
  return (
    <div className="books-list">
      {props.books.map(book => <Book {...book} />)}
    </div>
  )
}

export default BooksList;
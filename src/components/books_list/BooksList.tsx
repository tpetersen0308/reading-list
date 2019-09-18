import React from 'react';
import { BooksListProps } from "./BooksListProps";
import Book from "../book/BookCard";
import { authenticated } from "../../utilities/userSession";
import "./BooksList.css";

const BooksList: React.FC<BooksListProps> = (props: BooksListProps) => {
  return (
    <div className="books-list">
      {props.books.map(book => <Book book={book} apiHandler={props.apiHandler} authenticated={authenticated()} />)}
    </div>
  )
}

export default BooksList;
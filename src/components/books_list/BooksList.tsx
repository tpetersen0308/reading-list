import React from 'react';
import { BooksListProps } from "./BooksListProps";
import BookCard from "../book_card/BookCard";
import "./BooksList.css";

const BooksList: React.FC<BooksListProps> = ({ books, user, setUser, apiHandler, searchMode }) => {
  return (
    <div className="books-list">
      {books.map((book, i) => <div key={book.title + i}>
        <BookCard
          book={book}
          user={user}
          setUser={setUser}
          apiHandler={apiHandler}
          searchMode={searchMode}
        />
      </div>)}
    </div>
  )
}

export default BooksList;
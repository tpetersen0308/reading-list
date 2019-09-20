import React, { useState } from 'react';
import { BooksListProps } from "./BooksListProps";
import BookCard from "../book/BookCard";
import { currentUser, authenticated } from "../../utilities/userSession";
import "./BooksList.css";
import { IReadingList } from '../../types/IReadingList';
import { IUser } from '../../types/IUser';

const BooksList: React.FC<BooksListProps> = ({ books, apiHandler }) => {
  const user: IUser["user"] | null = currentUser();
  const [readingLists, setReadingLists] = useState<IReadingList["readingList"][] | null>(user && user.readingLists);
  return (
    <div className="books-list">
      {books.map((book, i) => <div key={book.title + i}>
        <BookCard
          book={book}
          apiHandler={apiHandler}
          readingLists={readingLists}
          setReadingLists={setReadingLists}
          authenticated={authenticated()}
        />
      </div>)}
    </div>
  )
}

export default BooksList;
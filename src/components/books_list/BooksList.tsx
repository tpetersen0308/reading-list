import React from 'react';
import { BooksListProps } from "./BooksListProps";
import BookCard from "../book_card/BookCard";
import "./BooksList.css";
import SaveBook from '../save_book/SaveBook';
import EditBook from '../edit_book/EditBook';

const BooksList: React.FC<BooksListProps> = ({ books, user, setUser, apiHandler, searchMode, handleUpdate }) => {
  return (
    <div className="books-list">
      {books.map((book, i) => {
        return <div key={book.title + i}>
          <BookCard
            book={book}
          >
            {(user && searchMode) ?
              <SaveBook
                book={book}
                user={user}
                setUser={setUser}
                apiHandler={apiHandler}
              />
              : <></>}
            {(user && handleUpdate && book.bookId) ?
              <EditBook bookId={book.bookId} listLength={books.length} handleChange={handleUpdate} />
              : <></>
            }
          </BookCard>
        </div>
      })
      }
    </div>
  )
}

export default BooksList;
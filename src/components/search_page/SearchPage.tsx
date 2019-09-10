import React from "react";
import { useState } from "react";
import Search from "../search/Search";
import BooksList from "../books_list/BooksList";
import ErrorsList from "../UI/ErrorsList";
import { ErrorsListProps } from "../UI/ErrorsListProps";
import { BooksListProps } from "../books_list/BooksListProps";
import { SearchPageProps } from "./SearchPageProps";
import { FormControlProps } from "react-bootstrap";
import { GoogleBooksResponse, GoogleBooksItem } from "../../utilities/ApiHandler/googleBooksResponse";
import "./SearchPage.css";

const SearchPage: React.SFC<SearchPageProps> = (props: SearchPageProps) => {
  const [title, setTitle] = useState<string>("");
  const [errors, setErrors] = useState<ErrorsListProps | null>(null);
  const [searchResults, setSearchResults] = useState<BooksListProps | null>(null);

  const handleTitleChange = (event: React.FormEvent<FormControlProps>) => {
    const { value } = event.target as HTMLInputElement;
    setTitle(value);
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();

    if (checkSearchTerms()) {
      fetchBooks();
    }
  }

  const checkSearchTerms = (): boolean => {
    const searchIsValid: boolean = title.replace(/\s/g, "").length > 0;
    if (!searchIsValid) {
      setErrors({ errors: [{ message: "You must include a search term." }] })
    }
    return searchIsValid;
  }

  const fetchBooks = async (): Promise<GoogleBooksResponse> => {
    const { items, errors } = await props.apiHandler.get(title);
    if (items) {
      setSearchResults(formatSearchResults(items))
      setErrors(null);
    } else if (errors) {
      setErrors({ errors: errors });
    }

    return { items: items };
  }

  const formatSearchResults = (items: GoogleBooksItem[]): BooksListProps => {
    return {
      books: items.map(item => {
        return {
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors,
          image: item.volumeInfo.imageLinks.thumbnail
        };
      })
    };
  }

  return (
    <div id="search-page">
      {errors && <ErrorsList {...errors} />}
      <div id="search-form">
        <strong>Use the search below to browse Google Books</strong>
        <br />
        <br />
        <Search submit={handleSubmit} handleTitleChange={handleTitleChange} />
      </div>
      {searchResults &&
        <BooksList {...searchResults} />
      }
    </div>
  )
}

export default SearchPage;
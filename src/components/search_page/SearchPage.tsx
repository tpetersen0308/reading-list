import React from "react";
import { useState } from "react";
import Search from "../search/Search";
import BooksList from "../books_list/BooksList";
import ErrorsList from "../error/ErrorsList";
import { ErrorsListProps } from "../error/ErrorsListProps";
import { BooksListProps } from "../books_list/BooksListProps";
import { SearchPageProps } from "./SearchPageProps";
import { FormControlProps } from "react-bootstrap";
import { GoogleBooksResponse, GoogleBooksItem } from "../../utilities/api_handler/GoogleBooksResponse";
import "./SearchPage.css";

const SearchPage: React.FC<SearchPageProps> = (props: SearchPageProps) => {
  const [searchTerms, setSearchTerms] = useState<{ title: string, author: string }>({ title: "", author: "" });
  const [errors, setErrors] = useState<ErrorsListProps | null>(null);
  const [searchResults, setSearchResults] = useState<BooksListProps | null>(null);

  const handleTitleChange = (event: React.FormEvent<FormControlProps>): void => {
    const { value } = event.target as HTMLInputElement;
    setSearchTerms({ ...searchTerms, title: value });
  }

  const handleAuthorChange = (event: React.FormEvent<FormControlProps>): void => {
    const { value } = event.target as HTMLInputElement;
    setSearchTerms({ ...searchTerms, author: value });
  }

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();

    if (checkSearchParameters()) {
      fetchBooks();
    }
  }

  const checkSearchParameters = (): boolean => {
    const searchIsValid: boolean = Object.values(searchTerms).some(param => {
      return param.replace(/\s/g, "").length > 0;
    });

    if (!searchIsValid) {
      setErrors({ errors: [{ message: "You must include a search term." }] })
    }
    return searchIsValid;
  }

  const fetchBooks = async (): Promise<GoogleBooksResponse> => {
    const { items, errors } = await props.apiHandler.getBooks(searchTerms);
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
      <Search submit={handleSubmit} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} />
      {searchResults && <BooksList {...searchResults} />}
    </div>
  )
}

export default SearchPage;
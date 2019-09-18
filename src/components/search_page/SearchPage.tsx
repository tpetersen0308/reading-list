import React from "react";
import { useState } from "react";
import Search from "../search/Search";
import BooksList from "../books_list/BooksList";
import ErrorsList from "../errors_list/ErrorsList";
import { SearchPageProps } from "./SearchPageProps";
import "./SearchPage.css";
import { IBooksList } from "../../types/IBooksList";
import { IError } from "../../types/IError";
import { IApiResponse } from "../../types/IApiResponse";
import { IGoogleBook } from "../../types/IGoogleBook";
import { IEvent } from "../../types/IEvent";

const SearchPage: React.FC<SearchPageProps> = (props: SearchPageProps) => {
  const [searchTerms, setSearchTerms] = useState<{ title: string, author: string }>({ title: "", author: "" });
  const [errors, setErrors] = useState<IError["errors"] | null>(null);
  const [searchResults, setSearchResults] = useState<IBooksList | null>(null);

  const handleTitleChange = (event: IEvent["formEvent"]): void => {
    const { value } = event.target as HTMLInputElement;
    setSearchTerms({ ...searchTerms, title: value });
  }

  const handleAuthorChange = (event: IEvent["formEvent"]): void => {
    const { value } = event.target as HTMLInputElement;
    setSearchTerms({ ...searchTerms, author: value });
  }

  const handleSubmit = (event: IEvent["buttonEvent"]): void => {
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
      setErrors([{ message: "You must include a search term." }]);
    }
    return searchIsValid;
  }

  const fetchBooks = async (): Promise<IApiResponse["googleBooks"]> => {
    const { items, errors } = await props.apiHandler.getBooks(searchTerms);
    if (items) {
      setSearchResults(formatSearchResults(items))
      setErrors(null);
    } else if (errors) {
      setErrors(errors);
    }

    return { items: items };
  }

  const formatSearchResults = (items: IGoogleBook[]): IBooksList => {
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
      {errors && <ErrorsList errors={errors} />}
      <Search submit={handleSubmit} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} />
      {searchResults && <BooksList {...searchResults} apiHandler={props.apiHandler} />}
    </div>
  )
}

export default SearchPage;
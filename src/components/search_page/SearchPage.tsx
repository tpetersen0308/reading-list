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
import { IEvent } from "../../types/IEvent";
import { formatSearchResults } from "../../utilities/helpers";

const SearchPage: React.FC<SearchPageProps> = ({ user, setUser, apiHandler }) => {
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
    const { items, errors } = await apiHandler.getBooks(searchTerms);
    if (items) {
      setSearchResults(formatSearchResults(items))
      setErrors(null);
    } else if (errors) {
      setErrors(errors);
    }

    return { items: items };
  }

  return (
    <div id="search-page">
      {errors && <ErrorsList errors={errors} />}
      <Search submit={handleSubmit} handleTitleChange={handleTitleChange} handleAuthorChange={handleAuthorChange} />
      {searchResults && <BooksList {...searchResults} user={user} setUser={setUser} apiHandler={apiHandler} searchMode={true} />}
    </div>
  )
}

export default SearchPage;
import React, { useEffect, useState } from "react";
import { IApiResponse } from "../../types/IApiResponse";
import { IReadingList } from "../../types/IReadingList";
import { IBanner } from "../../types/IBanner";
import BooksList from "../books_list/BooksList";
import "./ReadingList.css";
import Banner from "../banner/Banner";
import { ReadingListProps } from "./ReadingListProps";
import { IEvent } from "../../types/IEvent";
import { IBook } from "../../types/IBook";

const ReadingList: React.FC<ReadingListProps> = ({ user, setUser, apiHandler, match }) => {
  const [readingList, setReadingList] = useState<IReadingList["readingList"] | null>(null);
  const [error, setError] = useState<IBanner | null>(null);
  const readingListId: string = match.params.guid;

  useEffect(() => {
    const getReadingList = async (): Promise<IApiResponse["readingList"]> => {
      const { data, error } = await apiHandler.get(`/readinglist/${readingListId}`);
      if (data) {
        setReadingList(data);
        setError(null);
      } else if (error) {
        setError({ type: "error", message: error.message });
      }

      return { data };
    }
    getReadingList();
  }, [apiHandler, readingListId]);

  const handleUpdate = async (event: IEvent["changeEvent"], bookId: string): Promise<IApiResponse["readingList"]> => {
    const { data, error } = await apiHandler.patch(`/readinglist/${readingListId}`, {
      bookId: bookId,
      ranking: event.target.value
    });
    if (data) {
      setReadingList(data);
      setError(null);
    } else if (error) {
      setError({ type: "error", message: error.message });
    }

    return { data };
  }

  const sortBooks = (readingList: IReadingList["readingList"]): IBook[] => {
    return readingList.books.sort((a, b) => {
      if (a.ranking && b.ranking) {
        return a.ranking - b.ranking;
      };
      return 0;
    })
  }

  return (
    <div id="reading-list-page">
      <a id="home-link" href="/">Back to Search</a>
      <div className="reading-list">
        {error && <Banner type="error" message={"Error: " + error.message} />}
        {readingList &&
          <div>
            <h2 id="reading-list-title">
              {readingList.title}:
          </h2>
            <BooksList
              user={user}
              setUser={setUser}
              apiHandler={apiHandler}
              books={sortBooks(readingList)}
              searchMode={false}
              handleUpdate={handleUpdate} />
          </div>}
      </div>
    </div>
  )
}

export default ReadingList;

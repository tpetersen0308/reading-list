import { IReadingList } from "../types/IReadingList";
import { IBook } from "../types/IBook";
import { IGoogleBook } from "../types/IGoogleBook";
import { IBooksList } from "../types/IBooksList";

export function sortBooks(readingList: IReadingList["readingList"]): IBook[] {
  return readingList.books.sort((a, b) => {
    if (a.ranking && b.ranking) {
      return a.ranking - b.ranking;
    };
    return 0;
  });
}

export function formatSearchResults(items: IGoogleBook[]): IBooksList {
  return {
    books: items.map(item => {
      const { title, authors, imageLinks } = item.volumeInfo;
      return {
        title: title || "Title not available.",
        authors: authors || ["Author not available."],
        image: imageLinks ? imageLinks.thumbnail : undefined
      };
    })
  };
}

import { sortBooks, formatSearchResults } from "./helpers";
import { IGoogleBook } from "../types/IGoogleBook";
import { IBooksList } from "../types/IBooksList";

describe("sortBooks", () => {
  it("sorts the books in a reading list by their rankings", () => {
    const readingList = {
      title: "Reading List",
      readingListId: "reading-list-id",
      books: [
        {
          title: "Book 1 Title",
          authors: ["Book 1 Author 1", "Book 1 Author 2"],
          image: "Book 1 Image",
          dateCreated: "2019-09-20T17:29:28.566306",
          ranking: 2
        },
        {
          title: "Book 2 Title",
          authors: ["Book 2 Author 1", "Book 2 Author 2"],
          image: "Book 2 Image",
          dateCreated: "2019-08-20T17:29:28.566306",
          ranking: 1
        }
      ]
    };

    const sortedReadingList = sortBooks(readingList);
    const expectedResult = readingList.books.reverse();

    expect(sortedReadingList).toEqual(expectedResult);
  });
});

describe("formatSearchResults", () => {
  it("converts an array of IGoogleBooks to an IBooksList", () => {
    const googleBooks: IGoogleBook[] = [
      {
        volumeInfo: {
          title: "test book 1",
          authors: ["test author 1", "test author 2"],
          imageLinks: {
            thumbnail: "image-thumbnail"
          }
        }
      },
      {
        volumeInfo: {
          title: "test book 2",
          authors: ["test author 3", "test author 4"],
          imageLinks: {
            thumbnail: "image-thumbnail"
          }
        }
      },
    ];

    const expectedResult: IBooksList = {
      books:
        [
          {
            title: "test book 1",
            authors: ["test author 1", "test author 2"],
            image: "image-thumbnail"
          },
          {
            title: "test book 2",
            authors: ["test author 3", "test author 4"],
            image: "image-thumbnail"
          },
        ]
    };

    expect(formatSearchResults(googleBooks)).toEqual(expectedResult);
  });

  it("Handles undefined values", () => {
    const googleBooks: IGoogleBook[] = [
      {
        volumeInfo: {}
      },
    ];

    const expectedResult: IBooksList = {
      books:
        [
          {
            title: "Title not available.",
            authors: ["Author not available."],
          },
        ]
    };

    expect(formatSearchResults(googleBooks)).toEqual(expectedResult);
  })
});
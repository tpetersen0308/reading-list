import MockApiHandler from './MockApiHandler';
import { IReadingList } from '../../types/IReadingList';
import { IApiResponse } from '../../types/IApiResponse';
import { IGoogleBooksQuery } from '../../types/IGoogleBooksQuery';

describe('MockApiHandler', () => {
  it("can mock API GET requests", async () => {
    const data: IApiResponse["googleBooks"] = {
      items: [
        {
          volumeInfo: {
            title: "test book 1",
            authors: ["some author", "some other author"],
            imageLinks: {
              thumbnail: "image-thumbnail"
            }
          }
        },
        {
          volumeInfo: {
            title: "test book 2",
            authors: ["some author", "some other author"],
            imageLinks: {
              thumbnail: "image-thumbnail"
            }
          }
        },
      ]
    };

    const apiHandler: MockApiHandler = new MockApiHandler(data);
    const searchTerms: IGoogleBooksQuery = { title: "some title", author: "some author" }
    const result: IApiResponse["googleBooks"] = await apiHandler.getBooks(searchTerms);

    expect(result).toEqual(data);
  });

  it("can mock API POST requests", async () => {
    const readingList: IReadingList = {
      title: "test reading list",
      books: [
        {
          title: "test book title",
          authors: ["some author", "some other author"],
          image: "test image"
        }
      ]
    };

    const apiHandler: MockApiHandler = new MockApiHandler(readingList);
    const result: IApiResponse["readingList"] = await apiHandler.post("/test-path", readingList);

    expect(result).toEqual(readingList);
  })

  it("can mock API GET requests that return errors", async () => {
    const error: IApiResponse["googleBooks"] = {
      errors: [
        {
          message: "invalid fetch"
        }
      ]
    };

    const apiHandler: MockApiHandler = new MockApiHandler(error);
    const searchTerms: IGoogleBooksQuery = { title: "some title", author: "some author" }
    const result: IApiResponse["googleBooks"] = await apiHandler.getBooks(searchTerms);

    expect(result).toEqual(error);
  })
});

import MockGoogleApiHandler from './MockGoogleApiHandler';
import { GoogleBooksResponse } from './GoogleBooksResponse';
import { GoogleQueryParams } from './GoogleQueryParams';

describe('MockApiHandler', () => {
  it("can mock API GET requests", async () => {
    const data: GoogleBooksResponse = {
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

    const apiHandler: MockGoogleApiHandler = new MockGoogleApiHandler(data);
    const searchTerms: GoogleQueryParams = { title: "some title", author: "some author" }
    const result: GoogleBooksResponse = await apiHandler.get(searchTerms);

    expect(result).toEqual(data);
  });

  it("can mock API GET requests that return errors", async () => {
    const error: GoogleBooksResponse = {
      errors: [
        {
          message: "invalid fetch"
        }
      ]
    };

    const apiHandler: MockGoogleApiHandler = new MockGoogleApiHandler(error);
    const searchTerms: GoogleQueryParams = { title: "some title", author: "some author" }
    const result: GoogleBooksResponse = await apiHandler.get(searchTerms);

    expect(result).toEqual(error);
  })
});

import MockGoogleApiHandler from './mockGoogleApiHandler';
import { GoogleBooksResponse } from './googleBooksResponse';

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
    const path: string = "/api/lists";
    const result: GoogleBooksResponse = await apiHandler.get(path);

    expect(result).toEqual(data);
  });

  it("can mock API GET requests that return errors", async () => {
    const error: GoogleBooksResponse = {
      errors: [
        {
          message: "Invalid Fetch"
        }
      ]
    };

    const apiHandler: MockGoogleApiHandler = new MockGoogleApiHandler(error);
    const path: string = "/api/lists";
    const result: GoogleBooksResponse = await apiHandler.get(path);

    expect(result).toEqual(error);
  })
});

import { IReadingList } from '../../types/IReadingList';
import { IApiResponse } from '../../types/IApiResponse';
import { IGoogleBooksQuery } from '../../types/IGoogleBooksQuery';
import { IBook } from '../../types/IBook';

export default class MockApiHandler {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  async get(path: string): Promise<any> {
    return Promise.resolve(this.data);
  }

  async post(path: string, data: IReadingList["readingList"]): Promise<IApiResponse["readingList"]> {
    return Promise.resolve(this.data);
  }

  async put(path: string, data: IBook): Promise<IApiResponse["readingList"]> {
    return Promise.resolve(this.data);
  }

  async patch(path: string, data: { bookId: string, ranking: string }): Promise<IApiResponse["readingList"]> {
    return Promise.resolve(this.data);
  }

  async delete(path: string): Promise<IApiResponse["readingList"]> {
    let returnData;
    if (this.data.data) {
      returnData = { ...this.data, data: { books: [this.data.data.books[0]] } };
    } else {
      returnData = this.data;
    }
    return Promise.resolve(returnData);
  }

  async getBooks(searchTerms: IGoogleBooksQuery): Promise<IApiResponse["googleBooks"]> {
    return Promise.resolve(this.data);
  }

  async getUser(tokenId: string): Promise<IApiResponse["readingList"]> {
    return Promise.resolve(this.data);
  }

  formatQueryParams(searchTerms: IGoogleBooksQuery): string {
    return "some+title+intitle+some+author+inauthor";
  }
}
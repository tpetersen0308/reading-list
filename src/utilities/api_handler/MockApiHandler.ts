import { IReadingList } from '../../types/IReadingList';
import { IApiResponse } from '../../types/IApiResponse';
import { IGoogleBooksQuery } from '../../types/IGoogleBooksQuery';

export default class MockApiHandler {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  async get(path: string): Promise<any> {
    return Promise.resolve(this.data);
  }

  async post(path: string, data: IReadingList): Promise<IApiResponse["readingList"]> {
    return Promise.resolve(this.data);
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
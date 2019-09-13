import { GoogleBooksResponse } from './GoogleBooksResponse';
import { GoogleQueryParams } from './GoogleQueryParams';
import { GoogleUserResponse } from './GoogleUserResponse';

export default class MockApiHandler {
  data: any;

  constructor(data: any) {
    this.data = data;
  }

  async get(path: string): Promise<any> {
    return Promise.resolve(this.data);
  }

  async getBooks(searchTerms: GoogleQueryParams): Promise<GoogleBooksResponse> {
    return Promise.resolve(this.data);
  }

  async getUser(tokenId: string): Promise<GoogleUserResponse> {
    return Promise.resolve(this.data);
  }

  formatQueryParams(searchTerms: GoogleQueryParams): string {
    return "some+title+intitle+some+author+inauthor";
  }
}
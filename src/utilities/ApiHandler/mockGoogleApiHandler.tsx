import { GoogleBooksResponse } from './googleBooksResponse';

export default class MockApiHandler {
  data: GoogleBooksResponse;

  constructor(data: GoogleBooksResponse) {
    this.data = data;
  }

  async get(url: string): Promise<GoogleBooksResponse> {
    return Promise.resolve(this.data);
  }
}
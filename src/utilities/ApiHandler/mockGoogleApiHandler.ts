import { GoogleBooksResponse } from './googleBooksResponse';

export default class MockGoogleApiHandler {
  data: GoogleBooksResponse;

  constructor(data: GoogleBooksResponse) {
    this.data = data;
  }

  async get(title: string): Promise<GoogleBooksResponse> {
    return Promise.resolve(this.data);
  }
}
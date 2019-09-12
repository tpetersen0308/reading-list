import { GoogleBooksResponse } from './GoogleBooksResponse';
import { GoogleQueryParams } from './GoogleQueryParams';

export default class MockGoogleApiHandler {
  data: GoogleBooksResponse;

  constructor(data: GoogleBooksResponse) {
    this.data = data;
  }

  async get(searchTerms: GoogleQueryParams): Promise<GoogleBooksResponse> {
    return Promise.resolve(this.data);
  }

  formatQueryParams(searchTerms: GoogleQueryParams): string {
    return "some+title+intitle+some+author+inauthor";
  }
}
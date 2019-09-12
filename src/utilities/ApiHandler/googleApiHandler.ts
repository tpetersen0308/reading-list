import axios from 'axios';
import { GoogleBooksResponse } from './GoogleBooksResponse';
import { GoogleQueryParams } from './GoogleQueryParams';

export default class GoogleApiHandler {
  async get(searchTerms: GoogleQueryParams): Promise<GoogleBooksResponse> {
    const queryParams: string = this.formatQueryParams(searchTerms);
    const path: string = `volumes?q=${queryParams}&orderBy=relevance&fields=kind,items(volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail)`;

    return axios.get("https://www.googleapis.com/books/v1/" + path)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data.error;
      })
  }

  formatQueryParams(searchTerms: GoogleQueryParams): string {
    let queryParams: string[] = [];
    const { title, author } = searchTerms;
    if (title.length > 0) {
      queryParams.push(title.replace(/ /g, "+") + "+intitle");
    }
    if (author.length > 0) {
      queryParams.push(author.replace(/ /g, "+") + "+inauthor");
    }
    return queryParams.join("+");
  }
}
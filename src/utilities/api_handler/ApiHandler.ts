import axios from 'axios';
import { GoogleBooksResponse } from './GoogleBooksResponse';
import { GoogleQueryParams } from './GoogleQueryParams';
import { GoogleUserResponse } from './GoogleUserResponse';
import config from "../../config.json";

export default class ApiHandler {
  async get(path: string): Promise<string> {
    return axios.get(config.API_URL + path)
      .then(response => {
        return response.data
      })
      .catch(error => {
        return error.response.data.error;
      });
  }

  async getUser(tokenId: string): Promise<GoogleUserResponse> {
    return axios.post(config.GOOGLE_AUTH_CALLBACK_URL, { tokenId: tokenId }, {
      withCredentials: true,
    })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data.error;
      });
  }

  async getBooks(searchTerms: GoogleQueryParams): Promise<GoogleBooksResponse> {
    const queryParams: string = this.formatQueryParams(searchTerms);
    const path: string = `/volumes?q=${queryParams}&orderBy=relevance&fields=kind,items(volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail)`;

    return axios.get(config.GOOGLE_BOOKS_URL + path)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data.error;
      });
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
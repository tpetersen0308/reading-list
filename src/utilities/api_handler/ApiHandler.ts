import axios from 'axios';
import config from "../../config.json";
import { IReadingList } from '../../types/IReadingList';
import { IApiResponse } from '../../types/IApiResponse';
import { IGoogleBooksQuery } from "../../types/IGoogleBooksQuery";
import { IBook } from '../../types/IBook.js';

export default class ApiHandler {
  async get(path: string): Promise<IApiResponse["readingList"]> {
    return axios.get(config.API_URL + path, {
      withCredentials: true
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return { error: { message: error.message } };
      });
  }

  async post(path: string, data: IReadingList["readingList"]): Promise<IApiResponse["readingList"]> {
    return axios.post(config.API_URL + path, data, {
      withCredentials: true
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return { error: { message: error.message } };
      })
  }

  async put(path: string, data: IBook): Promise<IApiResponse["readingList"]> {
    return axios.put(config.API_URL + path, data, {
      withCredentials: true
    })
      .then(response => {
        return response;
      })
      .catch(error => {
        return { error: { message: error.message } };
      })
  }

  async getUser(tokenId: string): Promise<IApiResponse["readingList"]> {
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

  async getBooks(searchTerms: IGoogleBooksQuery): Promise<IApiResponse["googleBooks"]> {
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

  formatQueryParams(searchTerms: IGoogleBooksQuery): string {
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
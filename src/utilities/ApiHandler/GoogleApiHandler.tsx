import axios from 'axios';
import { GoogleBooksResponse } from './googleBooksResponse';

export default class GoogleApiHandler {
  async get(path: string): Promise<GoogleBooksResponse> {
    return axios.get("https://www.googleapis.com/books/v1/" + path)
      .then(response => response.data)
      .catch(error => error)
  }
}
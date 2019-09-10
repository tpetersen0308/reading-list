import axios from 'axios';
import { GoogleBooksResponse } from './googleBooksResponse';

export default class GoogleApiHandler {
  async get(title: string): Promise<GoogleBooksResponse> {
    const titleParams: string = title.replace(/ /g, "+");
    const path: string = `volumes?q=${titleParams}+intitle&orderBy=relevance&fields=kind,items(volumeInfo/title,volumeInfo/authors,volumeInfo/imageLinks/thumbnail)`;
    return axios.get("https://www.googleapis.com/books/v1/" + path)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error.response.data.error;
      })
  }
}
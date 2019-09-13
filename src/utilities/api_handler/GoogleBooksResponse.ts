import { ErrorProps } from "../../components/error/ErrorProps";

export interface GoogleBooksResponse {
  items?:
  GoogleBooksItem[],
  errors?: ErrorProps[]
}

export interface GoogleBooksItem {
  volumeInfo: {
    title: string,
    authors: string[],
    imageLinks: {
      thumbnail: string,
    }
  }
}
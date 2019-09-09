export interface GoogleBooksResponse {
  items?:
  {
    volumeInfo: {
      title: string,
      authors: string[],
      imageLinks: {
        thumbnail: string,
      }
    }
  }[],
  errors?: {
    message: string
  }
}

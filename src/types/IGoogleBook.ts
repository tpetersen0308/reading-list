export interface IGoogleBook {
  volumeInfo: {
    title: string,
    authors: string[],
    imageLinks: {
      thumbnail: string,
    }
  }
}
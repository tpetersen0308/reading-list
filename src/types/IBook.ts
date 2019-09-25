export interface IBook {
  title: string,
  authors: string[],
  image?: string,
  dateCreated?: string,
  bookId?: string,
  readingListId?: string,
  ranking?: number
}
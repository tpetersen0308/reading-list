export interface BooksListProps {
  books: {
    title: string,
    authors: string[],
    image: string
  }[]
}
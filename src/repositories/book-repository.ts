import { Book } from '../entities/book'

export interface SearchBookArguments {
  id?: number | null
  name?: string | null
  writerName?: string | null
  releaseDate?: Date | null
  publisher?: string | null
}

export interface BookRepository {
  create: (book: Book) => Promise<Book>
  list: (by: SearchBookArguments) => Promise<Book[]>
  delete: (id: number) => Promise<void>
  update: (book: Book) => Promise<Book>
}

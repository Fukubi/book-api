import { AppDataSource } from '../data-source'
import { Book } from '../entities/book'
import { BookRepository, SearchBookArguments } from './book-repository'

export class SQLiteBookRepository implements BookRepository {
  async create (book: Book): Promise<Book> {
    return await AppDataSource.manager.save(book)
  }

  async list (by: SearchBookArguments): Promise<Book[]> {
    const booksListed: Book[] = await AppDataSource.manager.findBy(Book, {
      id: by.id as number,
      name: by.name as string,
      publisher: by.publisher as string,
      releaseDate: by.releaseDate as Date,
      writerName: by.writerName as string
    })

    return booksListed
  }

  async delete (id: number): Promise<void> {
    await AppDataSource.manager.delete(Book, { _id: id })
  }

  async update (book: Book): Promise<Book> {
    return await AppDataSource.manager.save(book)
  }
}

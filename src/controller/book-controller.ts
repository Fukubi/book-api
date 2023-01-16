import { Book } from '../entities/book'
import { BookAlreadyExistsException, CreationBookWithIdException, UpdateBookWithoutIdException } from '../exceptions/book-controller-exceptions'
import { BookRepository, SearchBookArguments } from '../repositories/book-repository'

export class BookController {
  private readonly bookRepository: BookRepository

  constructor (bookRepository: BookRepository) {
    this.bookRepository = bookRepository
  }

  async create (book: Book): Promise<Book> {
    const booksFound = await this.bookRepository.list({
      name: book.name,
      writerName: book.writerName,
      publisher: book.publisher
    })

    if (booksFound.length !== 0) {
      throw new BookAlreadyExistsException()
    }

    if (book.id != null) {
      throw new CreationBookWithIdException()
    }

    return await this.bookRepository.create(book)
  }

  async list (by?: SearchBookArguments): Promise<Book[]> {
    if (by != null) {
      return await this.bookRepository.list(by)
    }

    return await this.bookRepository.list({})
  }

  async delete (id: number): Promise<void> {
    await this.bookRepository.delete(id)
  }

  async update (book: Book): Promise<Book> {
    if (book.id == null) {
      throw new UpdateBookWithoutIdException()
    }

    return await this.bookRepository.update(book)
  }
}

import { Book } from '../entities/book'
import { BookRepository, SearchBookArguments } from './book-repository'

export class InMemoryBookRepository implements BookRepository {
  private readonly books: Book[] = []

  async create (book: Book): Promise<Book> {
    const newBook = new Book(book.name, book.writerName, book.releaseDate, book.publisher, this.books.length + 1)
    this.books.push(newBook)

    return newBook
  }

  async list (by: SearchBookArguments): Promise<Book[]> {
    const booksListed: Book[] = []

    if (by.id == null && by.name == null && by.publisher == null && by.releaseDate == null && by.writerName == null) {
      return this.books
    }

    this.books.forEach((book) => {
      let filterPassed = false
      const validKeys = Object.keys(by)

      for (let i = 0; i < validKeys.length; i++) {
        filterPassed = book[validKeys[i] as keyof typeof book] != null &&
                        book[validKeys[i] as keyof typeof book] === by[validKeys[i] as keyof typeof by]

        if (!filterPassed) { break }
      }

      if (filterPassed) {
        booksListed.push(book)
      }
    })

    return booksListed
  }

  async delete (id: number): Promise<void> {
    let indexFound = -1

    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === id) {
        indexFound = i
        break
      }
    }

    if (indexFound !== -1) {
      this.books.splice(indexFound, 1)
    }
  }

  async update (book: Book): Promise<Book> {
    let indexFound = -1

    for (let i = 0; i < this.books.length; i++) {
      if (this.books[i].id === book.id) {
        indexFound = i
        break
      }
    }

    if (indexFound !== -1) {
      this.books[indexFound] = book
    }

    return book
  }
}

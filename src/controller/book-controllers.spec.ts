import { expect, test } from 'vitest'
import { Book } from '../entities/book'
import { BookAlreadyExistsException, CreationBookWithIdException, UpdateBookWithoutIdException } from '../exceptions/book-controller-exceptions'
import { InMemoryBookRepository } from '../repositories/in-memory-book-repository'
import { BookController } from './book-controller'

test('should create a book', () => {
  const book = new Book('Random', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookController = new BookController(new InMemoryBookRepository())

  void expect(bookController.create(book)).resolves.toHaveProperty('name', 'Random')
})

test('should not create a book with the same name, same author and same publisher', async () => {
  const bookOne = new Book('Random', 'John Doe', new Date('2021-02-15'), 'Publishing Awesome')
  const bookTwo = new Book('Random', 'John Doe', new Date('2021-02-11'), 'Publishing Awesome')
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(bookOne)

  void expect(bookController.create(bookTwo)).rejects.toThrowError(BookAlreadyExistsException)
})

test('should not create a book that have a id', async () => {
  const book = new Book('Random', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome', 1)
  const bookController = new BookController(new InMemoryBookRepository())

  void expect(bookController.create(book)).rejects.toThrowError(CreationBookWithIdException)
})

test('should find all books', async () => {
  const bookOne = new Book('Random1', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookTwo = new Book('Random2', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(bookOne)
  await bookController.create(bookTwo)

  void expect(bookController.list()).resolves.toHaveLength(2)
})

test('should filter books by name', async () => {
  const bookOne = new Book('Random1', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookTwo = new Book('Random2', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(bookOne)
  await bookController.create(bookTwo)

  void expect(bookController.list({ name: 'Random1' })).resolves.toHaveLength(1)
})

test('should filter books by writer name', async () => {
  const bookOne = new Book('Random1', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookTwo = new Book('Random2', 'John Deee', new Date('2021-02-12'), 'Publishing Awesome')
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(bookOne)
  await bookController.create(bookTwo)

  void expect(bookController.list({ writerName: 'John Doe' })).resolves.toHaveLength(1)
})

test('should filter books by publisher', async () => {
  const bookOne = new Book('Random1', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookTwo = new Book('Random2', 'John Doe', new Date('2021-02-12'), 'Publishing')
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(bookOne)
  await bookController.create(bookTwo)

  void expect(bookController.list({ publisher: 'Publishing Awesome' })).resolves.toHaveLength(1)
})

test('should delete books with id', async () => {
  const book = new Book('Random', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(book)

  await bookController.delete(1)

  void expect(bookController.list()).resolves.toHaveLength(0)
})

test('should update books with id', async () => {
  const book = new Book('Random', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const updatedBook = new Book('Updated', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome', 1)
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(book)
  await bookController.update(updatedBook)

  void expect(bookController.list({ name: 'Updated' })).resolves.toHaveLength(1)
})

test('should not update book without id', async () => {
  const book = new Book('Random', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const updatedBook = new Book('Updated', 'John Doe', new Date('2021-02-12'), 'Publishing Awesome')
  const bookController = new BookController(new InMemoryBookRepository())

  await bookController.create(book)

  void expect(bookController.update(updatedBook)).rejects.toThrowError(UpdateBookWithoutIdException)
})

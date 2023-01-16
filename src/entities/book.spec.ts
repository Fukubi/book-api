import { expect, test } from 'vitest'
import { EmptyNameException, EmptyPublisherNameException, EmptyWriterNameException, ReleaseDateAfterTodayException } from '../exceptions/book-exceptions'
import { Book } from './book'

test('should instanciate a new book', () => {
  const book = new Book('Random', 'John Doe', new Date(), 'Editor')

  expect(book).toBeInstanceOf(Book)
  expect(book.name).toBe('Random')
})

test('should not instanciate a book with date release date after today', () => {
  const releaseDate = new Date()

  releaseDate.setDate(releaseDate.getDate() + 1)

  expect(() => new Book('Random', 'John Doe', releaseDate, 'Editor')).toThrowError(ReleaseDateAfterTodayException)
})

test('should not instanciate a book with name empty', () => {
  expect(() => new Book('', 'John Doe', new Date(), 'Editor')).toThrowError(EmptyNameException)
})

test('should not instanciate a book with writers name empty', () => {
  expect(() => new Book('Random', '', new Date(), 'Editor')).toThrowError(EmptyWriterNameException)
})

test('should not instanciate a book with empty publisher', () => {
  expect(() => new Book('Random', 'John Doe', new Date(), '')).toThrowError(EmptyPublisherNameException)
})

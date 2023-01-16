import { Router } from 'express'
import { BookController } from './controller/book-controller'
import { InMemoryBookRepository } from './repositories/in-memory-book-repository'

const bookController = new BookController(new InMemoryBookRepository())
export const router = Router()

router.get('/', (req, res) => {
  void bookController.list().then((books) => {
    res.json(books)
  })
})

router.post('/', (req, res) => {
  void bookController.create(req.body).then((book) => {
    res.status(201).json(book)
  })
})

router.delete('/:id', (req, res) => {
  void bookController.delete(Number(req.params.id)).then(() => {
    res.json({ deleted: true })
  })
})

router.put('/', (req, res) => {
  void bookController.update(req.body).then((book) => {
    res.json(book)
  })
})

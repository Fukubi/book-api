import { Router } from 'express'
import { BookController } from './controller/book-controller'
import { InMemoryBookRepository } from './repositories/in-memory-book-repository'

const bookController = new BookController(new InMemoryBookRepository())
export const router = Router()

router.get('/', (req, res, next) => {
  void bookController.list().then((books) => {
    res.json(books)
  }).catch((err) => {
    next(err)
  })
})

router.post('/', (req, res, next) => {
  void bookController.create(req.body).then((book) => {
    res.status(201).json(book)
  }).catch((err) => {
    next(err)
  })
})

router.delete('/:id', (req, res, next) => {
  void bookController.delete(Number(req.params.id)).then(() => {
    res.json({ deleted: true })
  }).catch((err) => {
    next(err)
  })
})

router.put('/', (req, res, next) => {
  void bookController.update(req.body).then((book) => {
    res.json(book)
  }).catch((err) => {
    next(err)
  })
})

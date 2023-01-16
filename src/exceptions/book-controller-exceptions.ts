export class BookAlreadyExistsException extends Error {
  constructor () {
    super()

    this.message = 'Book already exists in persistence'
  }
}

export class CreationBookWithIdException extends Error {
  constructor () {
    super()

    this.message = 'Book cannot have id while creating'
  }
}

export class UpdateBookWithoutIdException extends Error {
  constructor () {
    super()

    this.message = 'Book id is necessary while updating'
  }
}

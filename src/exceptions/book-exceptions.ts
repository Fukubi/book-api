export class ReleaseDateAfterTodayException extends Error {
  constructor () {
    super()

    this.message = 'Release Date can only be before today'
  }
}

export class EmptyNameException extends Error {
  constructor () {
    super()

    this.message = 'Name cannot be empty'
  }
}

export class EmptyWriterNameException extends Error {
  constructor () {
    super()

    this.message = 'Writer Name cannot be empty'
  }
}

export class EmptyPublisherNameException extends Error {
  constructor () {
    super()

    this.message = 'Publisher Name cannot be empty'
  }
}

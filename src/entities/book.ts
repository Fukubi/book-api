import { EmptyNameException, EmptyPublisherNameException, EmptyWriterNameException, ReleaseDateAfterTodayException } from '../exceptions/book-exceptions'

export class Book {
  private readonly _id: number | null
  private _name: string
  private _writerName: string
  private _releaseDate: Date
  private _publisher: string

  constructor (name: string, writerName: string, releaseDate: Date, publisher: string, id: number | null = null) {
    this._id = id
    this.name = name
    this.writerName = writerName
    this.releaseDate = releaseDate
    this.publisher = publisher
  }

  public get id (): number | null {
    return this._id
  }

  public get name (): string {
    return this._name
  }

  public set name (name: string) {
    if (name === '') {
      throw new EmptyNameException()
    }

    this._name = name
  }

  public get writerName (): string {
    return this._writerName
  }

  public set writerName (writerName: string) {
    if (writerName === '') {
      throw new EmptyWriterNameException()
    }

    this._writerName = writerName
  }

  public get releaseDate (): Date {
    return this._releaseDate
  }

  public set releaseDate (releaseDate: Date) {
    if (releaseDate > new Date()) {
      throw new ReleaseDateAfterTodayException()
    }

    this._releaseDate = releaseDate
  }

  public get publisher (): string {
    return this._publisher
  }

  public set publisher (publisher: string) {
    if (publisher === '') {
      throw new EmptyPublisherNameException()
    }

    this._publisher = publisher
  }
}

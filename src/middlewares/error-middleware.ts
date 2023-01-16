import { NextFunction, Request, Response } from 'express'

export function errorMiddleware (err: Error, req: Request, res: Response, next: NextFunction): void {
  console.log(err.message)
  res.status(500).json({ error: 'something went wrong' })
}

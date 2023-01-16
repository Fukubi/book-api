import * as dotenv from 'dotenv'
import express from 'express'
import { errorMiddleware } from './middlewares/error-middleware'
import { router } from './routes'

dotenv.config()

const app = express()

app.use(express.json())
app.use(router)
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT as string}/`)
})

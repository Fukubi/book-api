import * as dotenv from 'dotenv'
import express from 'express'
import { AppDataSource } from './data-source'
import { errorMiddleware } from './middlewares/error-middleware'
import { router } from './routes'

dotenv.config()

AppDataSource.initialize().then(() => {
  console.log('Data source has been initialized!')
}).catch((err) => {
  console.error('Error during Data Source Initialization:', err)
})

const app = express()

app.use(express.json())
app.use(router)
app.use(errorMiddleware)

app.listen(process.env.PORT, () => {
  console.log(`Listening on http://localhost:${process.env.PORT as string}/`)
})

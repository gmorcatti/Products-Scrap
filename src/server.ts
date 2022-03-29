import 'dotenv/config'
import 'express-async-errors'

import express from 'express'

import { ErrorHandler } from './config/errors/ErrorHandler'
import router from './routes'

const app = express()

app.use(router)

app.use(ErrorHandler)

const PORT = 3000
app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`)
})

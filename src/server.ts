import express from 'express'

import { ErrorHandler } from './config/errors/ErrorHandler'
import router from './routes'

const app = express()

app.use(router)
app.use(ErrorHandler)

export default app

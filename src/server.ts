import 'dotenv/config'
import 'express-async-errors'

// import './config/database'

import express from 'express'

import router from './routes'

const app = express()

app.use(router)

const PORT = 3000
app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`)
})

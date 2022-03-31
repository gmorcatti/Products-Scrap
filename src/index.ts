import 'dotenv/config'
import 'express-async-errors'

import { Database } from './config/database'

import app from './server'

const database = Database.getInstance()

const AppDataSource = database.createAppDataSource()

AppDataSource.initialize().then(() => {
  const PORT = 3000

  app.listen(PORT, (): void => {
    console.log(`Server running on port ${PORT}`)
  })
}).catch(err => {
  console.error({
    message: 'Error while initializing the database',
    details: err.message,
    stack: err.stack,
  })
})

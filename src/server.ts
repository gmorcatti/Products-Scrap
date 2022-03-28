import express from 'express'

import { test } from './modules/products/controllers/test'

const app = express()

app.get('/', test)

const PORT = 3000
app.listen(PORT, (): void => {
  console.log(`Server running on port ${PORT}`)
})

import { Router } from 'express'

import { ScrapProductController } from '../modules/products/controllers/ScrapProductController'

const productRoutes = Router()

const scrapProductController = new ScrapProductController()

productRoutes.get(
  '/scrap',
  scrapProductController.handle,
)

export { productRoutes }

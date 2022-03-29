// import cors from 'cors'
import { Router } from 'express'

import { productRoutes } from './ProductRoutes'

const router = Router()

router.use(productRoutes)

export default router

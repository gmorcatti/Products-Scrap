// import cors from 'cors'
import { Router } from 'express'

import { ErrorHandler } from '../config/errors/ErrorHandler'

import { productRoutes } from './ProductRoutes'

const router = Router()

router.use(productRoutes)
router.use(ErrorHandler)

export default router

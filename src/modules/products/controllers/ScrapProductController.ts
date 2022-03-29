import { Request, Response } from 'express'

import { DatabaseRepository } from '../repositories/databaseRepository'
import { ScrapRepository } from '../repositories/scrapRepository'

import { ScrapProductService } from '../services/ScrapProductService'

export class ScrapProductController {
  async handle (req: Request, res: Response): Promise<Response> {
    const scrapRepository = new ScrapRepository()
    const databaseRepository = new DatabaseRepository()

    const scrapProductService = new ScrapProductService(scrapRepository, databaseRepository)

    const url = String(req.query.url)

    const product = await scrapProductService.execute(url)

    return res.status(200).send(product)
  }
}

import { Request, Response } from 'express'

import { ScrapRepository } from '../repositories/scrapRepository'

export const test = async (req: Request, res: Response) => {
  const scrapRepository = new ScrapRepository()

  const url = String(req.query.url)

  const teste = await scrapRepository.scrapProduct(url)

  res.send(teste)
}

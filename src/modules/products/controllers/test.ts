import { Request, Response } from 'express'

import { ScrapRepository } from '../repositories/scrapRepository'

export const test = async (req: Request, res: Response) => {
  const scrapRepository = new ScrapRepository()

  await scrapRepository.scrapProduct(req.params.url)

  res.end()
}

import { IScrapRepository } from '@modules/products/repositories/Interfaces/IScrapRepository'

import puppeteer from 'puppeteer'

import { Product } from '../entities/productEntity'

export class ScrapRepository implements IScrapRepository {
  async scrapProduct (url: string): Promise<Product> {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'domcontentloaded' })

    const element = await page.waitForSelector('#productTitle', { timeout: 2000 })

    console.log(element)

    await browser.close()

    return new Product()
  }
}

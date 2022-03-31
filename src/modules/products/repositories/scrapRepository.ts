
import puppeteer from 'puppeteer'

import { formatCurrencyToNumber } from '../../../utils/currency/formatCurrencyToNumber'
import { mapSitesSelectors, ISelectors } from '../../../utils/mapSiteSelectors'
import { getSiteHost } from '../../../utils/treatURL/getSiteHost'
import { removeQueryParams } from '../../../utils/treatURL/removeQueryParams'

import { Product } from '../entities/productEntity'
import { IScrapRepository } from '../repositories/Interfaces/IScrapRepository'

export class ScrapRepository implements IScrapRepository {
  async scrapProduct (url: string): Promise<Product> {
    const browser = await puppeteer.launch({
      headless: true,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--deterministic-fetch',
        '--disable-features=IsolateOrigins',
        '--disable-site-isolation-trials',
        // '--single-process',
      ],
    })
    const page = await browser.newPage()

    await page.goto(url, { waitUntil: 'networkidle2' })

    const currentSite = getSiteHost(url)

    const siteSelectors = mapSitesSelectors[currentSite]

    const treatedUrl = removeQueryParams(url)

    const evaluateFunction = ({ title, description, image, price }: ISelectors, url: string) => {
      return {
        title: document.querySelector(title)?.textContent.trim() || '',
        description: document.querySelector(description)?.textContent.trim() || '',
        url,
        image: document.querySelector(image)?.getAttribute('src') || '',
        price: document.querySelector(price)?.textContent.trim() || '',
      }
    }

    const element = await page.evaluate(evaluateFunction, siteSelectors, treatedUrl)

    const treatedElement = {
      ...element,
      price: formatCurrencyToNumber(element.price, siteSelectors.priceHasCents),
    }

    await browser.close()

    return treatedElement
  }
}

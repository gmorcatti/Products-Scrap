
import puppeteer, { Page } from 'puppeteer'

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
        '--disable-setuid-sandbox',
        '--no-sandbox',
      ],
    })
    const page = await browser.newPage()

    // A way to allow the browser to access the page
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36')

    await page.goto(url, { waitUntil: 'networkidle2' })

    const currentSite = getSiteHost(url)

    const siteSelectors = mapSitesSelectors[currentSite]

    const treatedUrl = removeQueryParams(url)

    const elements = await this.getPageInfoBySelectors(page, siteSelectors, treatedUrl)

    await browser.close()

    return elements
  }

  private async getPageInfoBySelectors (page: Page, siteSelectors: ISelectors, url: string) {
    const selectors = Object.keys(siteSelectors)

    // Create a promise that get each info by it selector
    const elementsPromise = selectors.map(async (key: string) => {
      if (key === 'url') return [key, url]

      const currentSelector: string = siteSelectors[key]

      try {
        const pageSelector = await page.waitForSelector(currentSelector, { timeout: 60000 })

        const currentElement: string = await pageSelector.evaluate((el, key): string => {
          if (key === 'image') return el?.getAttribute('src') || ''

          return el?.textContent.trim() || ''
        }, key)

        return [key, currentElement]
      } catch (err) {
        return [key, '']
      }
    })

    // Resolve all promises
    const elementsPromiseResolved = await Promise.all(elementsPromise)

    // Create a single object with all selectors value
    const objectElements = elementsPromiseResolved.reduce((acc: any, cur: string[]) => {
      const key: string = cur[0]
      const value: string = cur[1]

      if (key === 'price') {
        acc[key] = formatCurrencyToNumber(value)
      } else {
        acc[key] = value
      }
      return acc
    }, {})

    return objectElements
  }
}

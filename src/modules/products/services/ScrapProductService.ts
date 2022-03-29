import { AppError } from '../../../config/errors/AppError'

import { mapSitesSelectors } from '../../../utils/mapSiteSelectors'
import { getSiteHost } from '../../../utils/treatURL/getSiteHost'
import { removeQueryParams } from '../../../utils/treatURL/removeQueryParams'

import { Cache } from '../cache/productsCache'

import { Product } from '../entities/productEntity'

import { IDatabaseRepository } from '../repositories/Interfaces/IDatabaseRepository'
import { IScrapRepository } from '../repositories/Interfaces/IScrapRepository'

export class ScrapProductService {
  ONE_HOUR = 60 * 60 * 1000

  cache: Cache;

  constructor (
    private scrapRepository: IScrapRepository,
    private databaseRepository: IDatabaseRepository,
  ) {
    this.cache = Cache.getInstance()
  }

  async execute (url: string): Promise<Product> {
    if (!url) throw new AppError('The URL parameter was not informed.')
    if (!url.includes('http')) throw new AppError("The URL parameter informed is malformed (insert the 'http://' or 'https://')")

    const treatedUrl = removeQueryParams(url)
    const currentSite = getSiteHost(url)

    // Validate if the website is mapped in this API
    const isValidSite = Object.keys(mapSitesSelectors).includes(currentSite)
    if (!isValidSite) {
      throw new AppError(`The website '${currentSite}' is not accepted in this API request yet`)
    }

    // Search for this url in memory cache to avoid request in database
    const cachedProduct = this.cache.get(treatedUrl)
    if (cachedProduct) {
      console.log('Found product in Cache Instance')
      return cachedProduct
    }

    // If the cache doesn't exist, search in database and verify if the time has expired.
    const databaseProduct = await this.databaseRepository.findByUrl(treatedUrl)

    const productNotExist = !databaseProduct || !Object.keys(databaseProduct).length

    const productIsExpired = productNotExist || this.productIsExpired(databaseProduct)

    if (!productNotExist && !productIsExpired) {
      console.log('Found product in Database')
      return databaseProduct
    }

    // Just scrap the product if it doesn't exist in database or it's expired
    const productInfo = await this.scrapRepository.scrapProduct(url)

    console.log('Scrapped the product info succesfully')

    if (productNotExist) {
      console.log('Inserting into DB')
      this.databaseRepository.create(productInfo)
    } else {
      console.log('Updating the DB')
      this.databaseRepository.update(productInfo)
    }

    // Insert the product in memory cache
    this.cache.insert(treatedUrl, productInfo, this.ONE_HOUR)

    return productInfo
  }

  productIsExpired (product: Product): boolean {
    if (!product.updated_at) return true

    // Set the current timezone time to UTC
    const now = new Date()
    now.setDate(now.getUTCDate())
    now.setHours(now.getUTCHours())

    const productLastUpdate = new Date(product.updated_at)

    const dbDateIsGreaterThanOneHourAgo = now.getTime() - productLastUpdate.getTime() > this.ONE_HOUR

    return dbDateIsGreaterThanOneHourAgo
  }
}

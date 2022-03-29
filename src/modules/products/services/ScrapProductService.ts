import NodeCache from 'node-cache'

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
    const treatedUrl = removeQueryParams(url)

    const cachedProduct = this.cache.get(treatedUrl)
    if (cachedProduct) {
      console.log('Found product in Cache Instance')
      return cachedProduct
    }

    const databaseProduct = await this.databaseRepository.findByUrl(treatedUrl)

    const productNotExist = !databaseProduct || !Object.keys(databaseProduct).length

    const productIsExpired = productNotExist || this.productIsExpired(databaseProduct)

    if (!productNotExist && !productIsExpired) {
      console.log('Found product in Database')
      return databaseProduct
    }

    const productInfo = await this.scrapRepository.scrapProduct(url)

    if (productNotExist) {
      this.databaseRepository.create(productInfo)
    } else {
      this.databaseRepository.update(productInfo)
    }

    this.cache.insert(treatedUrl, productInfo, this.ONE_HOUR)

    return productInfo
  }

  productIsExpired (product: Product): boolean {
    if (!product.updated_at) return true

    const now = new Date()
    const productLastUpdate = new Date(product.updated_at)

    productLastUpdate.setHours(productLastUpdate.getHours() - 3)

    console.log(now.getTime() - productLastUpdate.getTime())
    const dbDateIsGreaterThanOneHourAgo = now.getTime() - productLastUpdate.getTime() > this.ONE_HOUR

    return dbDateIsGreaterThanOneHourAgo
  }
}

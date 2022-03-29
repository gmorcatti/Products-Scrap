import NodeCache from 'node-cache'

import { Product } from '../entities/productEntity'

export class Cache {
  private static instance: Cache;
  private static cacheInstance = new NodeCache();

  private constructor () { }

  public static getInstance (): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache()
    }

    return Cache.instance
  }

  public insert (key: string, value: Product, expireTime: number) {
    Cache.cacheInstance.set(key, value, expireTime)
  }

  public get (key: string): Product {
    return Cache.cacheInstance.get(key) as Product
  }
}

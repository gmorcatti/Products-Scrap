import { Product } from '@modules/products/entities/productEntity'

export interface IScrapRepository {
  scrapProduct(url: string): Promise<Product>;
}

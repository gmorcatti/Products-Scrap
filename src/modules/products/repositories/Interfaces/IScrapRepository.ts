import { Product } from '../../entities/productEntity'

export interface IScrapRepository {
  scrapProduct(url: string): Promise<Product>;
}

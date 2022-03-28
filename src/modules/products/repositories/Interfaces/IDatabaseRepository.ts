import { Product } from '@modules/products/entities/productEntity'

import { ICreateProductDTO } from '../dtos/ICreateProductsDTO'

export interface IDatabaseRepository {
  create(data: ICreateProductDTO): Promise<void>;
  findByTitle(title: string): Promise<Product>;
}

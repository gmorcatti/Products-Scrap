import { Product } from '../../entities/productEntity'

import { ICreateProductDTO } from '../dtos/ICreateProductsDTO'

export interface IDatabaseRepository {
  create(data: ICreateProductDTO): Promise<void>;
  update(data: ICreateProductDTO): Promise<void>;
  findByUrl(url: string): Promise<Product>;
}

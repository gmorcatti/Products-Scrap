import { Repository } from 'typeorm'

import { Database } from '../../../config/database'

import { Product } from '../entities/productEntity'
import { IDatabaseRepository } from '../repositories/Interfaces/IDatabaseRepository'

import { ICreateProductDTO } from './dtos/ICreateProductsDTO'

export class DatabaseRepository implements IDatabaseRepository {
  private repository: Repository<Product>;

  constructor () {
    const database = Database.getInstance()
    const AppDataSource = database.getAppDataSource()

    this.repository = AppDataSource.getRepository(Product)
  }

  async create ({
    title,
    image,
    price,
    description,
    url,
    updated_at,
  }: ICreateProductDTO): Promise<void> {
    const product = this.repository.create({
      title,
      image,
      price,
      description,
      url,
    })

    if (updated_at) product.updated_at = updated_at

    await this.repository.save(product)
  }

  async update ({
    title,
    image,
    price,
    description,
    url,
    updated_at,
  }: ICreateProductDTO): Promise<void> {
    const product: Product = {
      title,
      image,
      price,
      description,
      url,
    }

    if (updated_at) product.updated_at = updated_at

    await this.repository.update({ url }, product)
  }

  findByUrl (url: string): Promise<Product> {
    return this.repository.findOne({
      where: {
        url,
      },
    })
  }
}

import { AppDataSource } from '@config/database'

import { Product } from '@modules/products/entities/productEntity'
import { IDatabaseRepository } from '@modules/products/repositories/Interfaces/IDatabaseRepository'

import { Repository } from 'typeorm'

import { ICreateProductDTO } from './dtos/ICreateProductsDTO'

const { getRepository } = AppDataSource

export class DatabaseRepository implements IDatabaseRepository {
  private repository: Repository<Product>;

  constructor () {
    this.repository = getRepository(Product)
  }

  async create ({
    title,
    image,
    price,
    description,
    url,
  }: ICreateProductDTO): Promise<void> {
    const product = this.repository.create({
      title,
      image,
      price,
      description,
      url,
    })

    await this.repository.save(product)
  }

  findByTitle (title: string): Promise<Product> {
    // @ts-ignore
    return this.repository.findOne({ title })
  }
}

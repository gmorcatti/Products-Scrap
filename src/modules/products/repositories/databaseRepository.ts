import { Repository } from 'typeorm'

import { AppDataSource } from '../../../config/database'

import { Product } from '../entities/productEntity'
import { IDatabaseRepository } from '../repositories/Interfaces/IDatabaseRepository'

import { ICreateProductDTO } from './dtos/ICreateProductsDTO'

export class DatabaseRepository implements IDatabaseRepository {
  private repository: Repository<Product>;

  constructor () {
    this.repository = AppDataSource.getRepository(Product)
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

  async update ({
    title,
    image,
    price,
    description,
    url,
  }: ICreateProductDTO): Promise<void> {
    const product = {
      title,
      image,
      price,
      description,
      url,
    }

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

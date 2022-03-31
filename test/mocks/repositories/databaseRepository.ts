import { Product } from '../../../src/modules/products/entities/productEntity'

import { ICreateProductDTO } from '../../../src/modules/products/repositories/dtos/ICreateProductsDTO'
import { IDatabaseRepository } from '../../../src/modules/products/repositories/Interfaces/IDatabaseRepository'

import { MockAppDataSource } from '../database'

export class MockDatabaseRepository implements IDatabaseRepository {
  private repository;

  constructor () {
    this.repository = MockAppDataSource.getRepository('product')
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
      updated_at,
    })

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
    const product = {
      title,
      image,
      price,
      description,
      url,
      updated_at,
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

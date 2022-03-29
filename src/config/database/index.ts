import 'reflect-metadata'

import path from 'path'
import { DataSource } from 'typeorm'

import { Product } from '../../modules/products/entities/productEntity'

export const AppDataSource = new DataSource({
  type: 'postgres',
  // host: 'postgres_db',
  host: 'localhost',
  port: 5432,
  username: process.env.PG_USER,
  password: String(process.env.PG_PASS),
  synchronize: true,
  logging: false,
  entities: [
    Product,
  ],
  migrations: [
    path.join(__dirname, 'migrations', '*{.ts,.js}'),
  ],
})

AppDataSource.initialize()

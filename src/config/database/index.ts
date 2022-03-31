import 'reflect-metadata'

import path from 'path'
import { DataSource, DataSourceOptions } from 'typeorm'

import { MockAppDataSource } from '../../../test/mocks/database'

import { Product } from '../../modules/products/entities/productEntity'

export class Database {
  private static instance: Database;
  private AppDataSource: DataSource;

  private constructor (private isTest: boolean = false) { }

  public static getInstance (isTest: boolean = false): Database {
    if (!Database.instance) {
      Database.instance = new Database(isTest)
    }

    return Database.instance
  }

  public getAppDataSource () {
    if (!this.AppDataSource) throw new Error('AppDataSource was not created')
    return this.AppDataSource
  }

  public createAppDataSource () {
    if (this.isTest) {
      this.AppDataSource = MockAppDataSource as unknown as DataSource
      return this.AppDataSource
    }

    const configFile = {
      type: 'postgres',
      host: 'postgres_db',
      // host: 'localhost',
      // port: 5432,
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
    }

    this.AppDataSource = new DataSource(configFile as DataSourceOptions)
    return this.AppDataSource
  }
}

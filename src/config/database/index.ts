import 'reflect-metadata'

import path from 'path'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'postgres_db',
  username: process.env.PG_USER,
  password: String(process.env.PG_PASS),
  synchronize: true,
  logging: false,
  entities: [
    path.join(__dirname, '..', 'modules', '**', 'entities', '*{.ts,.js}'),
  ],
  migrations: [
    path.join(__dirname, 'migrations', '*{.ts,.js}'),
  ],
})

AppDataSource.initialize()

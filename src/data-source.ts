import path from 'path'
import 'reflect-metadata'
import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: 'db.dev',
  synchronize: true,
  logging: false,
  entities: [path.join(__dirname, 'entities', '*[^-spec*].ts')],
  migrations: [path.join(__dirname, 'migration', '*.ts')],
  subscribers: []
})

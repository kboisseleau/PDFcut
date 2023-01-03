import { DataSource } from 'typeorm'

const host = process.env.DB_HOST || 'localhost'
const username = process.env.DB_USERNAME || 'postgres'
const password = process.env.DB_PASSWORD || 'Dsd445a1313__!'
const port = process.env.DB_PORT || '5432'
const dbName = process.env.DB_NAME || 'dev'
const dbPath = process.env.DBPATH || 'dist/db'

const entitiesPath = `${dbPath}/entities/**/*.js`
const migrationssPath = `${dbPath}/migration/*.js`
const appDataSource = new DataSource({
  type: 'postgres',
  host,
  port: Number(port),
  username,
  password,
  database: dbName,
  synchronize: false,
  migrationsRun: false,
  logging: false,
  entities: [ entitiesPath ],
  migrationsTableName: 'migration_PDFcut',
  migrations: [ migrationssPath ]
})

export default appDataSource

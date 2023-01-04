import { DataSource } from 'typeorm'

const host = process.env.DB_HOST
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const port = process.env.DB_PORT
const dbName = process.env.DB_NAME
const dbPath = process.env.DBPATH

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

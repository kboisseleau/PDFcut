import { TableV0011676544716389 } from 'db/migration/1676544716389-Table-V001'
import { DataSource } from 'typeorm'

const host = process.env.DB_HOST || 'localhost'
const username = process.env.DB_USERNAME || 'postgres'
const password = process.env.DB_PASSWORD || 'postgres__!'
const port = process.env.DB_PORT || '5432'
const dbName = process.env.DB_NAME || 'dev'
const dbPath = process.env.DBPATH || 'dist/db'

const entitiesPath = `${dbPath}/entities/**/*.js`
const migrationssPath = `${dbPath}/migration/*.{js,ts}`
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
  migrations: [ TableV0011676544716389 ]
})

export default appDataSource

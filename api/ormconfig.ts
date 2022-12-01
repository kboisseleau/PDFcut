
const host = process.env.DB_HOST || '172.17.0.1'
const username = process.env.DB_USERNAME || 'postgres'
const password = process.env.DB_PASSWORD || 'postgres__!'
const port = process.env.DB_PORT || '5432'
const dbName = process.env.DB_NAME || 'dev'
const dbPath = process.env.DBPATH || 'dist/db'

const entitiesPath = `${dbPath}/entities/**/*.js`
const migrationssPath = `${dbPath}/migration/*.js`

module.exports = {
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
  migrationsTableName: 'migration_manipPDF',
  migrations: [ migrationssPath ],
  cli: {
    entitiesDir: 'db/entities',
    migrationsDir: 'db/migration'
  }
}

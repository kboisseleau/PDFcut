import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
// Service manager
import { FichierManagerService } from './fichier-manager/fichier-manager.service'

const host = process.env.DB_HOST || 'localhost'
const username = process.env.DB_USERNAME || 'postgres'
const password = process.env.DB_PASSWORD || 'Dsd445a1313__!'
const port = process.env.DB_PORT || '5432'
const dbName = process.env.DB_NAME || 'dev'
const dbPath = process.env.DBPATH || 'dist/db'
const entitiesPath = `${dbPath}/entities/**/*.js`
console.log(username, password)

@Module({
  imports: [
    TypeOrmModule.forRoot({
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
      migrationsTableName: 'migration_PDFcut'
    })
  ],
  providers: [
    FichierManagerService
  ],
  exports: [
    FichierManagerService
  ]
})
export class DbManagerModule {}

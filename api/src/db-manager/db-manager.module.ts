import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'
// Service manager
import { FichierManagerService } from './fichier-manager/fichier-manager.service'

const host = process.env.DB_HOST
const username = process.env.DB_USERNAME
const password = process.env.DB_PASSWORD
const port = process.env.DB_PORT
const dbName = process.env.DB_NAME
const dbPath = process.env.DBPATH
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

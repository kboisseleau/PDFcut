import { Module } from '@nestjs/common'
import { DbManagerModule } from 'src/db-manager/db-manager.module'
import { FichierService } from './services/fichier/fichier.service'

@Module({
  imports: [
    DbManagerModule
  ],
  exports: [
    FichierService,
    DbManagerModule
  ],
  controllers: [],
  providers: [
    FichierService
  ]
})
export class SharedModule {}

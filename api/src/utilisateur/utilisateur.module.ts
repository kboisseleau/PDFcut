import { Module } from '@nestjs/common'
import { UtilisateurService } from './services/utilisateur/utilisateur.service'
import { UtilisateurController } from './controller/utilisateur/utilisateur.controller'
import { SharedModule } from 'src/shared/shared.module'

@Module({
  imports: [ SharedModule ],
  exports: [
    UtilisateurService
  ],
  providers: [ UtilisateurService ],
  controllers: [ UtilisateurController ]
})
export class UtilisateurModule {}

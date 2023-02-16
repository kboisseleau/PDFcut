import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { AuthentificationService } from './services/authentification/authentification.service'
import { JwtModule } from '@nestjs/jwt'
import { jwtConstants } from './constantes'
import { LocalStrategy } from './strategy/local.strategy'
import { AuthentificationController } from './controller/authentification/authentification.controller'
import { UtilisateurModule } from 'src/utilisateur/utilisateur.module'
import { JwtStrategy } from './strategy/jwt.strategy'

@Module({
  imports: [
    UtilisateurModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' }
    })
  ],
  providers: [
    AuthentificationService,
    LocalStrategy,
    JwtStrategy
  ],
  exports: [
    AuthentificationService
  ],
  controllers: [ AuthentificationController ]
})

export class AuthentificationModule {
}

import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { AuthentificationService } from '../services/authentification/authentification.service'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor (private _authService: AuthentificationService) {
    super({ usernameField: 'email' })
  }

  async validate (email: string, password: string): Promise<any> {
    const utilisateur = await this._authService.validateUser(email, password)
  
    if (!utilisateur) {
      throw new UnauthorizedException()
    }
    return utilisateur
  }
}

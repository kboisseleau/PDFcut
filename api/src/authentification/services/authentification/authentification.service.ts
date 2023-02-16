import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Utilisateur } from 'db/entities/Utilisateur'
import { UtilisateurService } from 'src/utilisateur/services/utilisateur/utilisateur.service'

@Injectable()
export class AuthentificationService {

  constructor (
    private _utilisateurService: UtilisateurService,
    private _jwtService: JwtService
  ) {}
    
  public async validateUser (email: string, pass: string): Promise<any> {
    const utilisateur = await this._utilisateurService.findOne(email)

    if (utilisateur && utilisateur.password === pass) {
      const { password, ...result } = utilisateur
      return result
    }
  }
    
  public async login (utilisateur: Utilisateur): Promise<{accessToken: string}> {
    const payload = { email: utilisateur.email, sub: utilisateur.id }
    return {
      accessToken: this._jwtService.sign(payload)
    }
  }
}

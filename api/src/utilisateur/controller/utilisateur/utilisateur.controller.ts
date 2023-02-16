import { Body, Controller, Post } from '@nestjs/common'
import { Utilisateur } from 'src/@models/utilisateur/utilisateur.interface'
import { UtilisateurService } from 'src/utilisateur/services/utilisateur/utilisateur.service'

@Controller('utilisateur')
export class UtilisateurController {

  constructor (private _utilisateurService: UtilisateurService) {}

  @Post()
  signUp (@Body() body: Utilisateur): Promise<Utilisateur> {
    console.log(body)
    return this._utilisateurService.signUp(body)
  }
}

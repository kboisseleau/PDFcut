import { Injectable } from '@nestjs/common'
import { Utilisateur } from 'src/@models/utilisateur/utilisateur.interface'
import { UtilisateurManagerService } from 'src/db-manager/utilisateur-manager/utilisateur-manager.service'
@Injectable()
export class UtilisateurService {
  private readonly _utilisateur = [
    {
      id: 1,
      email:'boisseleau.kevin@gmail.com',
      prenom: 'john',
      nom: '',
      password: 'test'
    },
    {
      id: 2,
      email:'',
      prenom: 'maria',
      nom: '',
      password: 'guess'
    }
  ]
    
  constructor (private _utilisateurManagerService: UtilisateurManagerService) {}

  public async findOne (email: string): Promise<Utilisateur | undefined> {
    return this._utilisateur.find(utilisateur => utilisateur.email === email)
  }

  public async signUp (utilisateur: Utilisateur): Promise<Utilisateur> {
    return await this._utilisateurManagerService.ajouter(utilisateur)
  }
}

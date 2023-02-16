import { BadRequestException, Injectable } from '@nestjs/common'
import { Utilisateur } from 'db/entities/Utilisateur'
import { DataSource } from 'typeorm'

@Injectable()
export class UtilisateurManagerService {
  constructor (
    private _dataSource: DataSource
  ) { }
      
  lister (): Promise<Utilisateur[]> {
    return this._dataSource.getRepository(Utilisateur).find()
  }
  public async ajouter (donnee: Partial<Utilisateur>): Promise<Utilisateur> {
        
    if (donnee.id) {
        
    }
        
    return await this._dataSource.getRepository(Utilisateur).save(donnee)
        
  }
        
  public async supprimer (id: number): Promise<Utilisateur> {
    const oUtilisateur = await this.lecture(id)
    return await this._dataSource.getRepository(Utilisateur).remove(oUtilisateur)
  }
        
  modifier? (): Promise<Utilisateur> {
    throw new Error('Method not implemented.')
  }
        
  public async lecture (id: number): Promise<Utilisateur> {
    const oUtilisateur = await this._dataSource.getRepository(Utilisateur).findOne({
      where: {
        id
      }
    })
        
    if (oUtilisateur) {
      return oUtilisateur
    } else {
      throw new BadRequestException('L\'utilisateur n\'existe pas')
    }
  }
}

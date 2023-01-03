import { BadRequestException, Injectable } from '@nestjs/common'
import { Fichier } from 'db/entities/Fichier'
import { DataSource } from 'typeorm'

@Injectable()
export class FichierManagerService {
  constructor (
    private _dataSource: DataSource
  ) { }
    
  lister (): Promise<Fichier[]> {
    return this._dataSource.getRepository(Fichier).find()
  }
  public async ajouter (donnee: Partial<Fichier>): Promise<Fichier> {
    
    if (donnee.id) {
    
    }
    
    return await this._dataSource.getRepository(Fichier).save(donnee)
    
  }
    
  public async supprimer (id: number): Promise<Fichier> {
    const oFichier = await this.lecture(id)
    return await this._dataSource.getRepository(Fichier).save(oFichier)
  }
    
  modifier? (): Promise<Fichier> {
    throw new Error('Method not implemented.')
  }
    
  public async lecture (id: number): Promise<Fichier> {
    const oFichier = await this._dataSource.getRepository(Fichier).findOne({
      where: {
        id
      }
    })
    
    if (oFichier) {
      return oFichier
    } else {
      throw new BadRequestException('Le fichier n\'existe pas')
    }
  }
    
}

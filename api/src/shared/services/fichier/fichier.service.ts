import { BadRequestException, Injectable } from '@nestjs/common'
import { copyFileSync, mkdirSync } from 'fs'
import { Fichier } from '../../../../db/entities/Fichier'
import { FichierManagerService } from '../../../db-manager/fichier-manager/fichier-manager.service'
import * as path from 'path'
import { AjoutFichierOptions } from 'src/@models/fichier/ajout-fichier-options.interface'
import { promises } from 'fs'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const gm = require('gm').subClass({ imageMagick: true })

@Injectable()
export class FichierService {
  constructor (
    private _fichierManagerService: FichierManagerService
  ) { }

  public async deposer (oFichier: Express.Multer.File): Promise<Fichier> {

    const fichier = new Fichier()
    fichier.designationOriginal = oFichier.filename
    fichier.taille = oFichier.size

    const fichierAjouter = await this._fichierManagerService.ajouter(fichier)

    if (fichierAjouter) {
      return fichierAjouter
    } else {
      throw new BadRequestException('Impossible d\'enregistrer le fichier')
    }
  }

  public async recuperer (id: number): Promise<Fichier> {
    return await this._fichierManagerService.lecture(id)
  }

  public async supprimer (id: number): Promise<void> {
    this._fichierManagerService.supprimer(id)
  }

  public async ajouterFichier (options: AjoutFichierOptions): Promise<string> {
    const pathFile = path.join('fichiers', `${this._uuid()}-${options.nom}`)
    await promises.writeFile(pathFile, options.fichier.buffer)

    return pathFile
  }

  private _uuid (): string {
    let dt = new Date().getTime()
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (dt + Math.random() * 16) % 16 | 0
      dt = Math.floor(dt / 16)
      return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16)
    })

    return uuid
  }

  public enregistrerFichier (ancienChemin: string, nouveauChemin: string): void {
    const dir = path.join('fichiers', path.dirname(nouveauChemin))
    mkdirSync(dir, { recursive: true })
    copyFileSync(ancienChemin, path.join('fichiers', nouveauChemin))
  }

  public initChemin (nomFichier: string, ext: string): string {
    const date = new Date()
    const mois = date.getMonth().toString().length < 2 ? `0${date.getMonth() + 1}` : String(date.getMonth() + 1)

    return path.join(String(date.getFullYear()), mois, `${nomFichier}.${ext}`)
  }

  private _identify (buffer: Buffer): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      gm(buffer).identify((err, data) => {
        if (err) {
          reject(err)
        } else {
          const ret: any = {
            format: data.format,
            nombrePage: data.Format?.length ? data.Format.length : 1,
            path: data.path
          }
          resolve(ret)
        }
      })
    })
  }

  private async _testingPdfFile (buffer: Buffer, page: number): Promise<string> {
    const data = await this._identify(buffer)

    if (page >= data.nombrePage || page < 0) {
      throw new Error(`La page ${page} n'existe pas`)
    }

    if (data.format !== 'PDF') {
      throw new Error(`Format de fichier non PDF`)
    }

    return `${data.path}[${page}]`
  }

  private async _pdfToImage (buffer: Buffer, page: number): Promise<any> {
    const path = await this._testingPdfFile(buffer, page)
    return gm(buffer, path)
  }

  public async pdfToImageBuffer (buffer: Buffer, type: 'PNG' | 'WebP' | 'PDF', page = 0): Promise<Buffer> {
    const gmData = await this._pdfToImage(buffer, page)

    return new Promise<Buffer>((resolve, reject) => {
      gmData.toBuffer(type, (err, buffer) => {
        if (err) {
          reject(err)
        } else {
          resolve(buffer)
        }
      })
    })
  }
}

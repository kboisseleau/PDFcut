import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'
import { DecoupageResponse } from '../../dto/document/decoupage-response.interface'
import { PDFDocument } from 'pdf-lib'
import { FichierService } from 'src/shared/services/fichier/fichier.service'

@Injectable()
export class DocumentService {

  constructor (
    private _fichierService: FichierService
  ) {}

  public async cutPdf (oFichierLocal: any): Promise<DecoupageResponse[]> {
    try {
      if (oFichierLocal) {
        const toResponse: DecoupageResponse[] = []
        
        const pdfDoc = await PDFDocument.load(oFichierLocal.buffer, { ignoreEncryption: true })
        if (pdfDoc.isEncrypted) {
          throw new ConflictException('Opération non permise sur un document crypté ou protégé par mot de passe')
        }
        const numberOfPages = pdfDoc.getPages().length
        
        for (let i = 0; i < numberOfPages; i++) {
          const response: DecoupageResponse = {
            id: '',
            designation: '',
            pagelist: []
          }
        
          const subDocument = await PDFDocument.create()
          const [ copiedPage ] = await subDocument.copyPages(pdfDoc, [ i ])
        
          subDocument.addPage(copiedPage)
        
          const pdfBytes = await subDocument.save()
          const bufferPdf = Buffer.from(pdfBytes)
          // const dirDate = OutilsNextads.nouvelleDateCourte()
          const repertoire = `/tmp`
          const cheminFichierPdfAjoute = await this._fichierService.ajouterFichier({
            fichier: {
              buffer: bufferPdf
            },
            nom: `.pdf`,
            repertoire
          })

          // const bufferPng = await this._pdfToPng(bufferPdf)
          const bufferPng = await this._fichierService.pdfToImageBuffer(bufferPdf, 'WebP')
          const designation = cheminFichierPdfAjoute

          response.id = `${i + 1}`
          response.pagelist.push({
            title: `Document ${i + 1}`,
            designation,
            src: `data:image/png;base64, ${bufferPng.toString('base64')}`
          })
        
          toResponse.push(response)
        }
        return toResponse
      } else {
        throw new BadRequestException('PDF obligatoire')
      }
    } catch (e) {
      console.log(e)
    }
  }
}

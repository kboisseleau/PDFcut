// Natif element
import { Response } from 'express'
import { BadRequestException, ConflictException, Injectable } from '@nestjs/common'

// Package
import * as JSZip from 'jszip'
import { degrees, PDFDocument } from 'pdf-lib'

// Services
import { FichierService } from 'src/shared/services/fichier/fichier.service'

// Class
import { FichierExportable } from 'src/shared/class/FichierExportable'

// Interface
import { DecoupageResponse } from '../../dto/document/decoupage-response.interface'

// DTO
import { AjoutDocumentDto } from '../../dto/document/ajout-document.dto'
import { PageListDto } from '../../dto/document/page-list.dto'
import { DocumentDto } from '../../dto/document/document.dto'

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
      console.error(e)
    }
  }

  public async ajoutDocument (res: Response, body: AjoutDocumentDto): Promise<void> {
    const zip = new JSZip()

    for (const doc of body.toDocument) {
      if (doc.pagelist?.length) {
        try {
          const buffer = await this._buildPdf(doc)

          zip.file(`${doc.designation}.pdf`, buffer, { binary: true })

        } catch (err) {
          console.error(err, 'DocuementService.AjoutDocument => traitement des pages avec pdf-lib')
          throw new BadRequestException(err, err.response)
        }
      }
    }

    const zipUint8array = await zip.generateAsync({ type: 'uint8array' })
    const fichier = new FichierExportable(zipUint8array)

    fichier.sendAsZip(res)
  }

  private async _buildPdf (doc: DocumentDto): Promise<ArrayBufferLike> {
    const pdfDoc = await PDFDocument.create()
    const bufferFirstPage = (await this._fichierService.recupererFichier(doc.pagelist[0].designation)).buffer

    if (doc.pagelist.length > 1) {
      await this._addFirstPage(pdfDoc, bufferFirstPage, doc)

      for (const page of doc.pagelist) { 
        await this._addAllPageOfPageList(pdfDoc, page)
      }

      return await this._savePdfAndGetBuffer(pdfDoc)
    }
  }

  private async _savePdfAndGetBuffer (pdfDoc: PDFDocument): Promise<ArrayBufferLike> {
    const pdfBytes = await pdfDoc.save()
    const bufferPdf = Buffer.from(pdfBytes)

    const cheminFichierPdfAjoute = await this._fichierService.ajouterFichier({
      fichier: {
        buffer: bufferPdf
      },
      nom: `.pdf`,
      repertoireHorodatage: true
    })

    return (await this._fichierService.recupererFichier(cheminFichierPdfAjoute)).buffer
  }

  private async _addAllPageOfPageList (pdfDoc: PDFDocument, page: PageListDto) {
    const bufferPage = (await this._fichierService.recupererFichier(page.designation)).buffer

    const secondPdf = await PDFDocument.load(bufferPage, { ignoreEncryption: true })
    const [ copyPage2 ] = await pdfDoc.copyPages(secondPdf, [ 0 ])

    pdfDoc.addPage(copyPage2)
  }

  private async _addFirstPage (pdfDoc: PDFDocument, buffer: ArrayBufferLike, doc: DocumentDto) {
    const firstPdf = await PDFDocument.load(buffer, { ignoreEncryption: true })
    const [ copyPage1 ] = await pdfDoc.copyPages(firstPdf, [ 0 ])

    pdfDoc.addPage(copyPage1)
    doc.pagelist.splice(0, 1)
  }

  public async rotationPage (body: PageListDto): Promise<PageListDto> {
    const oFichier = await this._fichierService.recupererFichier(body.designation)
    const srcDoc = await PDFDocument.load(oFichier.buffer, { ignoreEncryption: true })

    const page = await srcDoc.getPage(0)
    const degreesActuel = page.getRotation()
    await page.setRotation(degrees(degreesActuel.angle + 90))

    const pdfBytes = await srcDoc.save()
    const bufferPdf = Buffer.from(pdfBytes)
    const cheminFichierPdfAjoute = await this._fichierService.ajouterFichier({
      fichier: {
        buffer: bufferPdf
      },
      nom: `.pdf`
    })

    const bufferPng = await this._fichierService.pdfToImageBuffer(bufferPdf, 'WebP')
    body.src = `data:image/png;base64, ${bufferPng.toString('base64')}`
    body.designation = cheminFichierPdfAjoute

    return body
  }
}

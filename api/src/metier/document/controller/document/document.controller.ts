import { Controller, Post, Body, UseInterceptors, UploadedFile, Res, BadRequestException, Put } from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import * as multer from 'multer'
import { AjoutDocumentDto } from '../../dto/document/ajout-document.dto'
import { PageListDto } from '../../dto/document/page-list.dto'
import { DocumentService } from '../../services/document/document.service'

@Controller('document')
export class DocumentController {

  constructor (
    private readonly _documentService: DocumentService,

  ) { }

  @Post('cut')
  @ApiTags('document')
  @ApiOperation({ summary: 'Ajouter un document reçu' })
  @UseInterceptors(FileInterceptor('file', {
    storage: multer.memoryStorage(),
    fileFilter: (req, file, cb) => {
      if (file.mimetype === 'application/pdf') {
        cb(null, true)
      } else {
        cb(new BadRequestException('Type de fichier non accepté'), false)
      }
    }
  }))
  async cutPdf (@UploadedFile() oFichier: Express.Multer.File): Promise<unknown> {
    return this._documentService.cutPdf(oFichier)
  }

  @Post('export/cut/pdf')
  ajoutDocument (@Res() res: Response, @Body() body: AjoutDocumentDto): Promise<void> {
    return this._documentService.ajoutDocument(res, body)
  }

  @Put('cut/rotation')
  @ApiTags('document')
  @ApiOperation({ summary: 'Pivoter une page' })
  async kinRotationPage (@Body() body: PageListDto): Promise<PageListDto> {

    return this._documentService.rotationPage(body)
  }

}

import { Controller, Get, Post, Body, Param, Put, Delete, UseInterceptors, UploadedFile, Res, Query, UploadedFiles, BadRequestException, ForbiddenException } from '@nestjs/common'
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express'
import { ApiTags, ApiOperation } from '@nestjs/swagger'
import { Response } from 'express'
import * as multer from 'multer'
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
}

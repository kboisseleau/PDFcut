import { Module } from '@nestjs/common'
import { SharedModule } from 'src/shared/shared.module'
import { DocumentController } from './controller/document/document.controller'
import { DocumentService } from './services/document/document.service'

@Module({
  imports: [
    SharedModule
  ],
  exports: [ ],
  controllers: [ DocumentController ],
  providers: [ DocumentService ]
})
export class DocumentModule {
}

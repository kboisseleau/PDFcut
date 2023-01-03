import { NgModule } from '@angular/core'
import { DocumentModule } from './document/document.module'

@NgModule({
  imports: [
    DocumentModule
  ],
  exports: [ DocumentModule ]
})
export class PublicModule { }
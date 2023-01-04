import { NgModule } from '@angular/core'
import { DocumentModule } from './document/document.module'
import { PublicRoutingModule } from './public-routing.module'

@NgModule({
  imports: [
    DocumentModule,
    PublicRoutingModule
  ],
  exports: [ DocumentModule ]
})
export class PublicModule { }
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { CutComponent } from './components/cut/cut/cut.component'
import { MiniatureComponent } from './components/cut/miniature/miniature.component'
import { ModalZoomImgComponent } from './components/cut/modal/modal-zoom-img/modal-zoom-img.component'
import { DocumentPageComponent } from './pages/document-page/document-page.component'
import { SharedModule } from 'src/app/shared/shared.module'
import { MaterialModule } from 'src/app/material/material.module'
import { CoreModule } from 'src/app/core/core.module';
import { CutPageComponent } from './pages/cut-page/cut-page.component'

@NgModule({
  declarations: [
    CutComponent,
    MiniatureComponent,
    ModalZoomImgComponent,
    DocumentPageComponent,
    CutPageComponent
  ],
  imports: [
    CoreModule,
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [ DocumentPageComponent ]
})
export class DocumentModule { }

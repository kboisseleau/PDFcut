import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { ComfirmDialogComponent } from './components/comfirm-dialog/comfirm-dialog.component'
import { ComfirmDialogService } from './services/comfirm-dialog.service'
import { MaterialModule } from '../material/material.module'
import { HttpClientModule } from '@angular/common/http'

@NgModule({
  declarations: [
    ComfirmDialogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [
    ComfirmDialogService
  ],
  exports: [
    HttpClientModule
  ]
})
export class CoreModule { }

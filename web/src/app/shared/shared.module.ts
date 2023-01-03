import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { WebCommonModule } from '../common/web-common.module '
import { SafeUrlPipe } from './pipes/safe-url.pipe'
import { DragDropModule } from '@angular/cdk/drag-drop'

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SafeUrlPipe,
    ScrollingModule,
    WebCommonModule,
    DragDropModule
  ],
  imports: [
    WebCommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule
  ],
  declarations: [
    SafeUrlPipe
  ],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class SharedModule { }

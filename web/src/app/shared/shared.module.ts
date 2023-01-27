import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { ScrollingModule } from '@angular/cdk/scrolling'

import { WebCommonModule } from '../common/web-common.module '
import { SafeUrlPipe } from './pipes/safe-url.pipe'
import { DragDropModule } from '@angular/cdk/drag-drop'
import { FieldErrorDirective } from './directives/field-error.directive'

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SafeUrlPipe,
    ScrollingModule,
    WebCommonModule,
    DragDropModule,
    FieldErrorDirective
  ],
  imports: [
    WebCommonModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule
  ],
  declarations: [
    SafeUrlPipe,
    FieldErrorDirective
  ],
  providers: [
    // { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})
export class SharedModule { }

import { MatSelectModule } from '@angular/material/select'
import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { MatIconModule } from '@angular/material/icon'
import { MatListModule } from '@angular/material/list'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatTooltipModule } from '@angular/material/tooltip'

import { FormsModule } from '@angular/forms'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatOptionModule } from '@angular/material/core'
import { FileUploadComponent } from './components/file-upload/file-upload.component'
import { DragAndDropDirective } from './directives/drag-and-drop.directive'

@NgModule({
  declarations: [
    FileUploadComponent,
    DragAndDropDirective

  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatTooltipModule,
    FormsModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule
  ],
  exports: [
    FileUploadComponent,
    DragAndDropDirective
  ],
  providers: [ ]
})
export class WebCommonModule { }

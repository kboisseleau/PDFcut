import { Component, ViewChild, Output, EventEmitter } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: [ './file-upload.component.scss' ]
})
export class FileUploadComponent {

  @ViewChild('file') file: any

  @Output() fichiers: EventEmitter<Set<File>> = new EventEmitter()

  public dataFile: any

  public files: Set<File> = new Set()

  public progress: any
  public canBeClosed = true
  public primaryButtonText = 'Upload'
  public showCancelButton = true
  public uploading = false
  public uploadSuccessful = false
  public messageErreur: string
  public bDragEnabled = false

  public uploadFile (event: any): void {
    this.onFilesAdded(event)
  }

  addFiles (): void {
    this.file.nativeElement.click()
  }

  public onFilesAdded (file: any = null): void {
    let files: { [key: string]: File }

    if (file !== null) {
      files = file
    } else {
      if (this.file) {
        files = this.file.nativeElement.files
      }
    }

    for (const key in files) {
      if (!isNaN(parseInt(key, 10))) {
        this.files.add(files[key])
      }
    }

    this.fichiers.emit(this.files)
    this.files = new Set()
    this.file.nativeElement.value = null
  }
}

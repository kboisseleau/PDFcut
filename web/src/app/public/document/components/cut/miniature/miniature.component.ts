import { Component, EventEmitter, Input, Output } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { ModalZoomImgComponent } from '../modal/modal-zoom-img/modal-zoom-img.component'

@Component({
  selector: 'app-miniature',
  templateUrl: './miniature.component.html',
  styleUrls: [ './miniature.component.scss' ]
})
export class MiniatureComponent {

  @Input() page: any

  @Output() delete: EventEmitter<string> = new EventEmitter()
  @Output() dupliquer: EventEmitter<string> = new EventEmitter()
  @Output() pivoter: EventEmitter<string> = new EventEmitter()

  constructor (public dialog: MatDialog) {
  }

  public remove (titre: string): void {
    this.delete.emit(titre)
  }

  public duplique (page: any): void {
    this.dupliquer.emit(page)
  }

  public zoom (): void {
    this.dialog.open(ModalZoomImgComponent, {
      data: {
        src: this.page.src
      }
    })
  }

  public pivote (page: any): void {
    this.pivoter.emit(page)
  }
}

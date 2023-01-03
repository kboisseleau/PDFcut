import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-modal-zoom-img',
  templateUrl: './modal-zoom-img.component.html',
  styleUrls: [ './modal-zoom-img.component.scss' ]
})
export class ModalZoomImgComponent {

  constructor (
    public dialogRef: MatDialogRef<ModalZoomImgComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { src: string }) { }

}

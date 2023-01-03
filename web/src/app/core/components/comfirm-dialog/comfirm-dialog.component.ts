import { Component, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'

@Component({
  selector: 'app-comfirm-dialog',
  templateUrl: './comfirm-dialog.component.html',
  styleUrls: [ './comfirm-dialog.component.scss' ]
})
export class ComfirmDialogComponent {

  constructor (
    public dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onConfirmClick (): void {
    this.dialogRef.close(true)
  }

}

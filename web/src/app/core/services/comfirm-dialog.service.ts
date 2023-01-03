import { Injectable } from '@angular/core'
import { MatDialog } from '@angular/material/dialog'
import { lastValueFrom } from 'rxjs'
import { ComfirmDialogComponent } from '../components/comfirm-dialog/comfirm-dialog.component'

@Injectable({
  providedIn: 'root'
})
export class ComfirmDialogService {

  constructor (public matDialog: MatDialog) { }
  
  public async comfirm (): Promise<boolean> {
    const dialogRef = this.matDialog.open(ComfirmDialogComponent)

    return await lastValueFrom(dialogRef.afterClosed())
  }
}

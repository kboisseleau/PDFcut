import { Injectable } from '@angular/core'
import { MatSnackBar } from '@angular/material/snack-bar'

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor (private readonly _snackBar: MatSnackBar) { }

  public success (message = 'Opération réalisée avec succès'): void {
    this.openSnackBar(message, '', 'success-snackbar')
  }

  public error (message: string): void {
    this.openSnackBar(message, '', 'error-snackbar')
  }

  public warning (message: string): void {
    this.openSnackBar(message, '', 'warning-snackbar')
  }

  public openSnackBar (
    message: string,
    action: string,
    className = '',
    duration = 1000
  ): void {
    this._snackBar.open(message, action, {
      duration,
      panelClass: [ className ]
    })
  }
}

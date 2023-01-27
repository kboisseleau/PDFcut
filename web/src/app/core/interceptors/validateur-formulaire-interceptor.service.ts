import { Injectable } from '@angular/core'
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { ValidateurFormulaireService } from '../services/validateur-formulaire/validateur-formulaire.service'
import { NotificationService } from '../services/notification/notification.service'

@Injectable({
  providedIn: 'root'
})
export class ValidateurFormulaireInterceptorService implements HttpInterceptor {

  constructor (
    private _validateur: ValidateurFormulaireService,
    private _alert: NotificationService
  ) { }

  intercept (req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err, _caught) => {
        if (err instanceof HttpErrorResponse) {
          // Si erreur 422
          if (err.status === 422 && !(err.error.response && err.error.response.custom)) {
            this._validateur.afficherErreur(err)
          } else if (err.status === 422 && (err.error.response && err.error.response.custom)) {
            this._alert.warning(err.error.response.custom)
          } else {
            console.error(err)
            this._alert.error(err.error.message)
          }

        }

        return throwError(() => err)
      })
    )
  }
}

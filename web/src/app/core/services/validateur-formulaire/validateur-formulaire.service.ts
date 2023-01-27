import { Injectable, EventEmitter } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { NotificationService } from '../notification/notification.service'
import { RetourErreurDto } from 'src/app/@models/errors/retour-erreur-dto'

@Injectable({
  providedIn: 'root'
})
export class ValidateurFormulaireService {

  public onCatchErreur$: EventEmitter<RetourErreurDto[]> = new EventEmitter<RetourErreurDto[]>()

  public erreurMajeur = false

  constructor (
    private _alert: NotificationService
  ) { }

  public afficherErreur (err: HttpErrorResponse): void {

    if (err.error.response) {
      const listErreur: RetourErreurDto[] = []
      err.error.response.forEach((erreur: any) => {
        const erreurDefaut: RetourErreurDto = { champ: '', erreur: {} }
        listErreur.push(this._constructErreur(erreur, erreurDefaut))
      })
      this.onCatchErreur$.emit(listErreur)
      if (listErreur.length === 1) {
        this._alert.warning('Un champ est mal renseigné')
      }

      if (listErreur.length > 1) {
        this._alert.warning(listErreur.length + ' champs sont mal renseignés')
      }
    } else {
      this._alert.warning('Un champ est mal renseigné')
    }

  }

  private _constructErreur (erreur: any, elementErreur: RetourErreurDto): RetourErreurDto {
    let erreurTraite: RetourErreurDto = elementErreur

    if (erreur.children.length === 0) {
      erreurTraite.champ += erreur.property
      erreurTraite.erreur = erreur.constraints

      let messageErreur = ''
      for (const key in erreur.constraints) {
        if (Object.prototype.hasOwnProperty.call(erreur.constraints, key)) {
          messageErreur += erreur.constraints[key]

        }
      }
      console.warn(`${erreurTraite.champ} : ${messageErreur}`)
    } else {
      erreurTraite = this._constructErreur(erreur.children[0], erreurTraite)
    }
    return erreurTraite
  }
}

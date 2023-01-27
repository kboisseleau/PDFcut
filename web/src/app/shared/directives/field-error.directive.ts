import { DOCUMENT } from '@angular/common'
import { Directive, Host, Optional, OnInit, ElementRef, Renderer2, Input, Inject } from '@angular/core'
import { MatFormField } from '@angular/material/form-field'
import { filter, map } from 'rxjs/operators'
import { RetourErreurDto } from 'src/app/@models/errors/retour-erreur-dto'
import { ValidateurFormulaireService } from '../../core/services/validateur-formulaire/validateur-formulaire.service'

@Directive({
  selector: '[pdfcutMatError]'
})
export class FieldErrorDirective implements OnInit {
  @Input() fcName: string | number
  private _document: Document

  constructor (
    private _el: ElementRef,
    private _renderer: Renderer2,
    @Optional() @Inject(DOCUMENT) _document: any,
    @Host() @Optional() private _matFormField: MatFormField,
    private _validateur: ValidateurFormulaireService
  ) {
    this._document = document // this is to avoid AoT Compilation error
  }

  ngOnInit (): void {
    if (this._matFormField) {
      if (!this.fcName) {
        this.fcName = this._matFormField._control.ngControl.name
      }
      this._validateur.onCatchErreur$
        .pipe(
          filter((listeErreur: RetourErreurDto[]) => listeErreur.some(err => err.champ === this.fcName)),
          map((listeErreur: RetourErreurDto[]) => listeErreur.find(err => err.champ === this.fcName))
        )
        .subscribe((erreur: RetourErreurDto) => {
          this._afficherErreurs(erreur)
        })
    }
  }

  private _afficherErreurs (erreur: RetourErreurDto) {
    const divEl = this._renderer.createElement('div')
    this._renderer.addClass(divEl, 'errorDiv')
    const txt = this._renderer.createText(Object.values(erreur.erreur)[0])
    this._renderer.appendChild(divEl, txt)

    // Supprimer avant
    const ancienDivEl = this._el.nativeElement.querySelector('.errorDiv')
    if (ancienDivEl) {
      this._renderer.removeChild(this._el.nativeElement, ancienDivEl)
    }

    this._renderer.appendChild(this._el.nativeElement, divEl)

    this._matFormField._control.ngControl.control.setErrors(erreur.erreur)
    this._matFormField._control.ngControl.control.markAsTouched()

    setTimeout(() => {
      this._allerPremiereErreur()
    })
  }

  private _allerPremiereErreur () {
    if (this._document) {
      const premierElementErreur = this._document.body.querySelector('.mat-form-field-invalid')
      if (premierElementErreur) {
        premierElementErreur.scrollIntoView()
      }
    }
  }

}

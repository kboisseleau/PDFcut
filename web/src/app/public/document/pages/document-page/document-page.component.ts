import { Component } from '@angular/core'
import { CutResponse } from 'src/app/@models/document/cut-response.interface'
import { DocumentService } from '../../services/document.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: [ './document-page.component.scss' ]
})
export class DocumentPageComponent {
  public displayProgressSpinner = false

  constructor (
    private _documentService: DocumentService,
    private _router: Router
  ) {

  }

  public async onFichiers (e: Set<File>): Promise<void> {
    this.displayProgressSpinner = true
    if (e) {
      this._documentService.decoupage = await this._documentService.cutPdf(e) as CutResponse[]

      this.displayProgressSpinner = false

      if (this._documentService.decoupage) {
        setTimeout(() => {
          this.displayProgressSpinner = false
        })
        this._router.navigateByUrl('decoupage')
      }
    }
    this.displayProgressSpinner = false
  }

}

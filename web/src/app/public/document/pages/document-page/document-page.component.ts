import { Component } from '@angular/core'
import { CutResponse } from 'src/app/@models/document/cut-response.interface'
import { DocumentService } from '../../services/document.service'

@Component({
  selector: 'app-document-page',
  templateUrl: './document-page.component.html',
  styleUrls: [ './document-page.component.scss' ]
})
export class DocumentPageComponent {

  public decoupage: CutResponse[]
  constructor (private _documentService: DocumentService) {

  }

  public async onFichiers (e: Set<File>): Promise<void> {
    if (e) {
      console.log(e)
      this.decoupage = await this._documentService.cutPdf(e) as CutResponse[]
      console.log(this.decoupage)
    }
  }

  public async enregistrer (event: CutResponse[]) {

    console.log(event)
  }
}

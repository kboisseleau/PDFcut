import { Component, OnInit } from '@angular/core'
import { CutResponse } from 'src/app/@models/document/cut-response.interface'
import { saveAs } from 'file-saver'
import { DocumentService } from '../../services/document.service'
import { PageList } from 'src/app/@models/document/page-list.interface'
@Component({
  selector: 'app-cut-page',
  templateUrl: './cut-page.component.html',
  styleUrls: [ './cut-page.component.scss' ]
})
export class CutPageComponent implements OnInit {
  public displayProgressSpinner = false
  public decoupage: CutResponse[]
  constructor (private _documentService: DocumentService) {
    this.decoupage = _documentService.decoupage
  }
  
  ngOnInit (): void {
    this.displayProgressSpinner = false
  }

  public async rotation (page: PageList): Promise<void> {

    const newPage = await this._documentService.rotationPage(page)
    const tPage = this.decoupage.find((d) => parseInt(d.id, 10) === page.id)

    const indexPage = tPage.pagelist.indexOf(page)

    tPage.pagelist[indexPage] = newPage
  }

  public async enregistrer (event: CutResponse[]): Promise<any> {
    this.displayProgressSpinner = true
    const data = {
      toDocument: event
    }
    const blob = await this._documentService.export(data)
    
    if (blob) {
      saveAs(blob, 'document-générer')
    }
    this.displayProgressSpinner = false
  }
}

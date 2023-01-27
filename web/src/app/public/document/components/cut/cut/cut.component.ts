import { Component, EventEmitter, Input, Output } from '@angular/core'
import { CutResponse } from 'src/app/@models/document/cut-response.interface'
import { PageList } from 'src/app/@models/document/page-list.interface'
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop'
import { ComfirmDialogService } from 'src/app/core/services/comfirm-dialog/comfirm-dialog.service'

@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: [ './cut.component.scss' ]
})
export class CutComponent {

  @Input()
  get decoupage (): CutResponse[] {
    return this._decoupage
  }
  set decoupage (decoupage: CutResponse[]) {
    this._decoupage = decoupage

    if (this._decoupage?.length) {
      this._initDragAndDrop()
    }
  }

  @Output() enregistrer: EventEmitter<CutResponse[]> = new EventEmitter()
  @Output() rotation: EventEmitter<PageList> = new EventEmitter()
  public connectedTo: string[] = []
  private _decoupage: CutResponse[]
  // eslint-disable-next-line @typescript-eslint/naming-convention

  constructor (private _confirm: ComfirmDialogService) { }

  public async remove (titre: string): Promise<void> {
    if (await this._confirm.comfirm()) {
      this.decoupage.forEach(d => {
        if (d.pagelist.length) {
          const i = d.pagelist.findIndex((p: any) => p.title === titre)

          if (i > -1) {
            d.pagelist.splice(i, 1)
          }
        }
      })
    }
  }

  public async dupliquer (page: any, document: CutResponse): Promise<void> {
    const dupPage = {
      designation: page.designation,
      src: page.src,
      title: page.title
    }

    dupPage.title = `Document ${ this.decoupage.length + 1 }`
    const doc: CutResponse = {
      id: String(this.decoupage.length + 1),
      designation: document.designation,
      pagelist: [ dupPage ]
    }

    const indexDocument = (d: CutResponse) => d.id === document.id
    const index = this.decoupage.findIndex(indexDocument) + 1
    this.decoupage.splice(index, 0, doc)
    this._initDragAndDrop()
  }

  public async pivoter (page: PageList, document: CutResponse): Promise<void> {
    page.id = parseInt(document.id, 10)
    this.rotation.emit(page)
  }

  drop (event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex)
    }
  }

  public enregistre (): void {
    this.enregistrer.emit(this.decoupage)
  }

  private _initDragAndDrop (): void {
    if (this.decoupage?.length) {
      for (const page of this.decoupage) {
        this.connectedTo.push(page.id)
      }
    }
  }
}

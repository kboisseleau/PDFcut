import { Component } from '@angular/core'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent {
  title = 'web'

  /* public async rotation (page: KinPageList) {

    const newPage = await this._documentService.kinRotationPage(page, this._idDossier)
    const tPage = this.decoupage.find((d) => parseInt(d.id, 10) === page.id)

    const indexPage = tPage.pagelist.indexOf(page)

    tPage.pagelist[indexPage] = newPage
  } */
}

import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { firstValueFrom, lastValueFrom } from 'rxjs'
import { CutResponse } from 'src/app/@models/document/cut-response.interface'
import { PageList } from 'src/app/@models/document/page-list.interface'
import { NotificationService } from 'src/app/core/services/notification/notification.service'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private _baseUrl: string = environment.apiUrl
  private _decoupage: CutResponse[]

  get decoupage (): CutResponse[] {
    return this._decoupage
  }

  set decoupage (data: CutResponse[]) {
    this._decoupage = data
  }

  constructor (
    private _http: HttpClient,
    private _notification: NotificationService
  ) {
  }

  public async cutPdf (fichiers: Set<File>): Promise<any> {
    const route = Location.joinWithSlash(this._baseUrl, `document/cut`)
    const formData = new FormData()

    fichiers.forEach(fichier => {
      formData.append('file', fichier, fichier.name)
    })

    return lastValueFrom(this._http.post(route, formData))
      .catch(err => {
        if (err?.error?.message) {
          // this._notification.error(err.error.message)
        }
      })
  }

  public rotationPage (page: PageList): Promise<any> {
    const route = Location.joinWithSlash(this._baseUrl, `document/cut/rotation`)
    return firstValueFrom(this._http.put(route, page))
  }

  public export (data: { toDocument: CutResponse[] }): Promise<any> {
    const route = Location.joinWithSlash(this._baseUrl, `document/export/cut/pdf`)

    return lastValueFrom(this._http.post(route, data, { responseType: 'blob' }))
      .then(res => {
        return new Blob([ res ], { type: 'application/zip' })
      })
      .catch(() => {
        return ''
      })
  }
}

import { Location } from '@angular/common'
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { lastValueFrom } from 'rxjs'
import { environment } from '../../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private _baseUrl: string = environment.apiUrl
  constructor (
    private _http: HttpClient

  ) {
  }

  public async cutPdf (fichiers: Set<File>): Promise<any> {
    const route = Location.joinWithSlash(this._baseUrl, `document/cut`)
    const formData = new FormData()

    fichiers.forEach(fichier => {
      formData.append('file', fichier, fichier.name)
    })

    console.log(route)
    return lastValueFrom(this._http.post(route, formData))
      .catch(err => {
        console.error(err)
      })
  }
}

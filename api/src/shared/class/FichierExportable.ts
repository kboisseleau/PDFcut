import { Response } from 'express'
import { Readable } from 'stream'

export class FichierExportable {

  private _chunk: any
  private _stream: Readable

  constructor (chunk: any) {
    this._chunk = chunk
    this._stream = new Readable()
  }

  public sendAsCSV (res: Response): void {
    this._pushChunkInStreamAndSend(this._chunk, res, 'text/csv; charset=utf-8')
  }

  public sendAsTXT (res: Response): void {
    this._pushChunkInStreamAndSend(this._chunk, res, 'text/plain')
  }

  public sendAsJSON (res: Response): void {
    this._pushChunkInStreamAndSend(this._chunk, res, 'application/json')
  }

  public sendAsHTML (res: Response): void {
    this._pushChunkInStreamAndSend(this._chunk, res, 'text/html; charset=utf-8')
  }

  public sendAsPdf (res: Response): void {
    this._pushChunkInStreamAndSend(this._chunk, res, 'application/pdf')
  }

  public sendAsZip (res: Response): void {
    this._pushChunkInStreamAndSend(this._chunk, res, 'application/zip')
  }

  public async sendAsPDF (res: Response,): Promise<void> {
    this._pushChunkInStreamAndSend(this._chunk, res, 'application/pdf')
  }

  private _pushChunkInStreamAndSend (chunk: any, res: Response, contentType: string) {
    res.setHeader('Content-Type', contentType)
    this._stream.push(chunk)
    this._stream.push(null)
    this._stream.pipe(res)
  }

}

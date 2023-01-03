import { Injectable } from '@nestjs/common'
import * as crypto from 'crypto'

@Injectable()
export class CryptoService {
  private _algorithm = 'aes-256-ctr'
  private _secretKey = 'vOVH8sdmpNWjRRIqBc7rdks01ljHzfr3'

  public encrypt (plainText: string): string {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv(this._algorithm, this._secretKey, iv)
    const encrypted = Buffer.concat([ cipher.update(plainText), cipher.final() ])

    return iv.toString('hex') + '.' + encrypted.toString('hex')
  }

  public decrypt (encoded: string): string {
    const [ iv, encodedText ] = encoded.split('.')
    const decipher = crypto.createDecipheriv(this._algorithm, this._secretKey, Buffer.from(iv, 'hex'))
    const decrypted = Buffer.concat([ decipher.update(Buffer.from(encodedText, 'hex')), decipher.final() ])

    return decrypted.toString()
  }

  public encryptTokenARCOPOLE (secretKey: string, encoded: string): string {
    const secretKeyDecode = Buffer.from(secretKey, 'base64').toString('utf-8')

    const hmacSha256 = crypto.createHmac('sha256', secretKeyDecode)
      .update(encoded)
      .digest('base64')

    const base64url = hmacSha256
      .replace(/\//g, '_')
      .replace(/\+/g, '-')

    return base64url
  }

}

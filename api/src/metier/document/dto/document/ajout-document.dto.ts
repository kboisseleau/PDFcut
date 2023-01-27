import { Type } from 'class-transformer'
import { ValidateNested, IsArray } from 'class-validator'
import { DocumentDto } from './document.dto'

export class AjoutDocumentDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DocumentDto)
  toDocument: DocumentDto[]
}

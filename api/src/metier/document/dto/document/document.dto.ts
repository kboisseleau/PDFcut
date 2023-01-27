import { Type } from 'class-transformer'
import { IsString, IsOptional, IsNotEmpty, ValidateNested, ValidateIf } from 'class-validator'
import { PageListDto } from './page-list.dto'

export class DocumentDto {
  @IsNotEmpty()
  @IsString()
  id: string

  @ValidateIf(o => o.pagelist.length)
  @IsNotEmpty()
  @IsString()
  designation: string

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => PageListDto)
  pagelist: PageListDto[]
}

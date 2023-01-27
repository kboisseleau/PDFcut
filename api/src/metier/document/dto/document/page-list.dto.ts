import { IsString, IsNotEmpty } from 'class-validator'

export class PageListDto {
  @IsNotEmpty()
  @IsString()
  title: string

  @IsNotEmpty()
  @IsString()
  designation: string

  @IsNotEmpty()
  @IsString()
  src: string
}

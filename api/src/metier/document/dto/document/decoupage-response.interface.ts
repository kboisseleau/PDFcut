import { PageList } from 'src/@models/document/page-list.interface'

export interface DecoupageResponse {
  id: string
  designation: string
  pagelist: PageList[]
}

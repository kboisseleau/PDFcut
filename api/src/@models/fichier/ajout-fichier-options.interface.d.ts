import { DonneesFichier } from './donnees-fichier.interface'

export interface AjoutFichierOptions {
  fichier: DonneesFichier
  nom: string
  repertoire?: string
  repertoireHorodatage?: boolean
}

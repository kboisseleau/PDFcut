import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity({ name: 'fichier' })
export class Fichier {
  @PrimaryGeneratedColumn()
    id: number
  
  @Column({ name: 'chemin' })
  chemin: string

  @Column({ name: 'taille', nullable: true })
  taille: number

  @Column({ name: 'designationoriginal', nullable: true })
  designationOriginal: string

  @Column({ name: 'designation', nullable: true })
  designation: string
}

import { Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class Fichier {
  @PrimaryGeneratedColumn()
    id: number
}

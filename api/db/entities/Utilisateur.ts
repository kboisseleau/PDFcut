import { Column, Entity, PrimaryColumn } from 'typeorm'

@Entity()
export class Utilisateur {
  @PrimaryColumn()
    id: number
  
  @Column()
    email: string
  
  @Column()
    nom: string
  
  @Column()
    prenom: string

  @Column()
    password: string

}

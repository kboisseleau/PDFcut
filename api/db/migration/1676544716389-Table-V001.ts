import { MigrationInterface, QueryRunner } from 'typeorm'

export class TableV0011676544716389 implements MigrationInterface {
  name = 'TableV0011676544716389'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "fichier" ("id" SERIAL NOT NULL, "chemin" character varying NOT NULL, "taille" integer, "designationoriginal" character varying, "designation" character varying, CONSTRAINT "PK_35788b04279085d084bae7bfe52" PRIMARY KEY ("id"))`)
    await queryRunner.query(`CREATE TABLE "utilisateur" ("id" integer NOT NULL, "email" character varying NOT NULL, "nom" character varying NOT NULL, "prenom" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_838f0f99fe900e49ef050030443" PRIMARY KEY ("id"))`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "utilisateur"`)
    await queryRunner.query(`DROP TABLE "fichier"`)
  }

}

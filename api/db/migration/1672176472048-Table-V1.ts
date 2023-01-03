import { MigrationInterface, QueryRunner } from 'typeorm'

export class TableV11672176472048 implements MigrationInterface {
  name = 'TableV11672176472048'

  public async up (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "fichier" ("id" SERIAL NOT NULL, "chemin" character varying NOT NULL, "taille" integer, "designationoriginal" character varying, "designation" character varying, CONSTRAINT "PK_35788b04279085d084bae7bfe52" PRIMARY KEY ("id"))`)
  }

  public async down (queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "fichier"`)
  }

}

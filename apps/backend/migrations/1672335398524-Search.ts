import { MigrationInterface, QueryRunner } from "typeorm";

export class Search1672335398524 implements MigrationInterface {
    name = 'Search1672335398524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "search" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "SearchText" character varying NOT NULL, "searcherId" uuid, CONSTRAINT "PK_0bdd0dc9f37fc71a6050de7ae7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "search" ADD CONSTRAINT "FK_7bf0d45f2f4b7cac730dde9f3b1" FOREIGN KEY ("searcherId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "search" DROP CONSTRAINT "FK_7bf0d45f2f4b7cac730dde9f3b1"`);
        await queryRunner.query(`DROP TABLE "search"`);
    }

}

/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserCredential1671742971078 implements MigrationInterface {
	name = 'UserCredential1671742971078';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`CREATE TABLE "user_credential" ("userId" uuid NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_8e6ecd93d94d74454b2ad8ba8f8" PRIMARY KEY ("userId"))`);
		await queryRunner.query(`ALTER TABLE "user" ADD "credentialId" uuid`);
		await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_4336f39b406d2bd9630afc8820d" UNIQUE ("credentialId")`);
		await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_4336f39b406d2bd9630afc8820d" FOREIGN KEY ("credentialId") REFERENCES "user_credential"("userId") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_4336f39b406d2bd9630afc8820d"`);
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4336f39b406d2bd9630afc8820d"`);
		await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "credentialId"`);
		await queryRunner.query(`DROP TABLE "user_credential"`);
	}
}

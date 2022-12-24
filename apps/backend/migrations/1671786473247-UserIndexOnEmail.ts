/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserIndexOnEmail1671786473247 implements MigrationInterface {
	name = 'UserIndexOnEmail1671786473247';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_8e1f623798118e629b46a9e6299" UNIQUE ("phone")`);
		await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "UQ_da64556cd7f0337b018c66e7e83" UNIQUE ("nid")`);
		await queryRunner.query(`CREATE UNIQUE INDEX "IDX_e12875dfb3b1d92d7d7c5377e2" ON "user" ("email") `);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`DROP INDEX "public"."IDX_e12875dfb3b1d92d7d7c5377e2"`);
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_da64556cd7f0337b018c66e7e83"`);
		await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_8e1f623798118e629b46a9e6299"`);
	}
}

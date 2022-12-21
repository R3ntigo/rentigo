/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class BaseMigration1671646883301 implements MigrationInterface {
	name = 'BaseMigration1671646883301';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "pricing_policy" RENAME COLUMN "durationLength" TO "durationSpan"`);
		await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "durationLength" TO "durationSpan"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "durationSpan" TO "durationLength"`);
		await queryRunner.query(`ALTER TABLE "pricing_policy" RENAME COLUMN "durationSpan" TO "durationLength"`);
	}
}

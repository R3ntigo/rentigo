/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class FixDurationColumnName1671647113819 implements MigrationInterface {
	name = 'FixDurationColumnName1671647113819';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "pricing_policy" RENAME COLUMN "durationSpan" TO "durationLength"`);
		await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "durationSpan" TO "durationLength"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "durationLength" TO "durationSpan"`);
		await queryRunner.query(`ALTER TABLE "pricing_policy" RENAME COLUMN "durationLength" TO "durationSpan"`);
	}
}

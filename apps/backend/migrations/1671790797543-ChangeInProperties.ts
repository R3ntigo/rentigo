/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChangeInProperties1671790797543 implements MigrationInterface {
	name = 'ChangeInProperties1671790797543';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "renting_policy" DROP COLUMN "lastUpdated"`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "renting_policy" ADD "lastUpdated" TIMESTAMP NOT NULL`);
	}
}

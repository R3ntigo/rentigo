/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductFamilyNullable1671829863206 implements MigrationInterface {
	name = 'ProductFamilyNullable1671829863206';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "family" DROP NOT NULL`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "product" ALTER COLUMN "family" SET NOT NULL`);
	}
}

/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ResourceBucketAndUrl1671963086477 implements MigrationInterface {
	name = 'ResourceBucketAndUrl1671963086477';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "resource" ADD "bucket" character varying`);
		await queryRunner.query(`ALTER TABLE "resource" ADD "urlExpires" TIMESTAMP`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "urlExpires"`);
		await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "bucket"`);
	}
}

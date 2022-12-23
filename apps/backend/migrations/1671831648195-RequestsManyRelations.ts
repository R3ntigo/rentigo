/* eslint-disable class-methods-use-this */
/* eslint-disable max-len */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RequestsManyRelations1671831648195 implements MigrationInterface {
	name = 'RequestsManyRelations1671831648195';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_0f5783657234aa8f7a70e383942"`);
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_3782dc6d12e6e474d8bab1d080b"`);
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "REL_0f5783657234aa8f7a70e38394"`);
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "REL_3782dc6d12e6e474d8bab1d080"`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_0f5783657234aa8f7a70e383942" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_3782dc6d12e6e474d8bab1d080b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_3782dc6d12e6e474d8bab1d080b"`);
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_0f5783657234aa8f7a70e383942"`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "REL_3782dc6d12e6e474d8bab1d080" UNIQUE ("addressId")`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "REL_0f5783657234aa8f7a70e38394" UNIQUE ("productId")`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_3782dc6d12e6e474d8bab1d080b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_0f5783657234aa8f7a70e383942" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}
}

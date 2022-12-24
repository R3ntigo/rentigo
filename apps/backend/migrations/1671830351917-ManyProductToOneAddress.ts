/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ManyProductToOneAddress1671830351917 implements MigrationInterface {
	name = 'ManyProductToOneAddress1671830351917';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_fb3cd53102946b4c6c990ff4bee"`);
		await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "REL_fb3cd53102946b4c6c990ff4be"`);
		await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_fb3cd53102946b4c6c990ff4bee" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_fb3cd53102946b4c6c990ff4bee"`);
		await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "REL_fb3cd53102946b4c6c990ff4be" UNIQUE ("addressId")`);
		await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_fb3cd53102946b4c6c990ff4bee" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}
}

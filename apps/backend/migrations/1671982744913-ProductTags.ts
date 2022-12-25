/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class ProductTags1671982744913 implements MigrationInterface {
	name = 'ProductTags1671982744913';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_f71c88c1df2896fb7d8f6e2adda"`);
		await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_f71c88c1df2896fb7d8f6e2adda" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_f71c88c1df2896fb7d8f6e2adda"`);
		await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_f71c88c1df2896fb7d8f6e2adda" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}
}

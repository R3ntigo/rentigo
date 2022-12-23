/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class RequestUserToBorrower1671822453368 implements MigrationInterface {
	name = 'RequestUserToBorrower1671822453368';

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_38554ade327a061ba620eee948b"`);
		await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "userId" TO "borrowerId"`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_ce9038729c2a254a1eb1f61704e" FOREIGN KEY ("borrowerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_ce9038729c2a254a1eb1f61704e"`);
		await queryRunner.query(`ALTER TABLE "request" RENAME COLUMN "borrowerId" TO "userId"`);
		await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_38554ade327a061ba620eee948b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
	}
}

import { MigrationInterface, QueryRunner } from "typeorm";

export class CUDDate1671734963947 implements MigrationInterface {
    name = 'CUDDate1671734963947'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "request" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "request" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "request" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "resource" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "renting_policy" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "renting_policy" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "renting_policy" ADD "deletedAt" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "product" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "product" ADD "deletedAt" TIMESTAMP`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "renting_policy" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "renting_policy" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "renting_policy" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "resource" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "deletedAt"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "request" DROP COLUMN "createdAt"`);
    }

}

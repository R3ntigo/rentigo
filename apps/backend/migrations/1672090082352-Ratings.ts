import { MigrationInterface, QueryRunner } from "typeorm";

export class Ratings1672090082352 implements MigrationInterface {
    name = 'Ratings1672090082352'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "reviewerId" uuid, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_received_reviews" ("userId" uuid NOT NULL, "reviewId" uuid NOT NULL, CONSTRAINT "PK_d48ef9085ca91c2eb9f19c19784" PRIMARY KEY ("userId", "reviewId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_66b8d38bf0cb2aa4e4f76b165d" ON "user_received_reviews" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_63adc5c1ea9d2c80259f5b278a" ON "user_received_reviews" ("reviewId") `);
        await queryRunner.query(`CREATE TABLE "product_reviews" ("productId" uuid NOT NULL, "reviewId" uuid NOT NULL, CONSTRAINT "PK_6f73f58d36b9ad7d77b26dcd7a6" PRIMARY KEY ("productId", "reviewId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_32edd80d91dff1bc19e79c8f16" ON "product_reviews" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_b63c24c493a2207e6e0a8afa3e" ON "product_reviews" ("reviewId") `);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_34413365b39e3bf5bea866569b4" FOREIGN KEY ("reviewerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_received_reviews" ADD CONSTRAINT "FK_66b8d38bf0cb2aa4e4f76b165de" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_received_reviews" ADD CONSTRAINT "FK_63adc5c1ea9d2c80259f5b278a7" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_reviews" ADD CONSTRAINT "FK_32edd80d91dff1bc19e79c8f16d" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_reviews" ADD CONSTRAINT "FK_b63c24c493a2207e6e0a8afa3e0" FOREIGN KEY ("reviewId") REFERENCES "review"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_reviews" DROP CONSTRAINT "FK_b63c24c493a2207e6e0a8afa3e0"`);
        await queryRunner.query(`ALTER TABLE "product_reviews" DROP CONSTRAINT "FK_32edd80d91dff1bc19e79c8f16d"`);
        await queryRunner.query(`ALTER TABLE "user_received_reviews" DROP CONSTRAINT "FK_63adc5c1ea9d2c80259f5b278a7"`);
        await queryRunner.query(`ALTER TABLE "user_received_reviews" DROP CONSTRAINT "FK_66b8d38bf0cb2aa4e4f76b165de"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_34413365b39e3bf5bea866569b4"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_b63c24c493a2207e6e0a8afa3e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_32edd80d91dff1bc19e79c8f16"`);
        await queryRunner.query(`DROP TABLE "product_reviews"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_63adc5c1ea9d2c80259f5b278a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_66b8d38bf0cb2aa4e4f76b165d"`);
        await queryRunner.query(`DROP TABLE "user_received_reviews"`);
        await queryRunner.query(`DROP TABLE "review"`);
    }

}

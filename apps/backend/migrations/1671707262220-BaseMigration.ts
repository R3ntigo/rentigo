import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1671707262220 implements MigrationInterface {
    name = 'BaseMigration1671707262220'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "division" character varying NOT NULL, "district" character varying NOT NULL, "subDistrict" character varying NOT NULL, "details" character varying NOT NULL, "label" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."pricing_policy_durationunit_enum" AS ENUM('MINUTE', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR')`);
        await queryRunner.query(`CREATE TABLE "pricing_policy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" integer NOT NULL, "productId" uuid, "durationUnit" "public"."pricing_policy_durationunit_enum" NOT NULL, "durationLength" integer NOT NULL, CONSTRAINT "PK_78105eb11bd75fd76a23bbc9bb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."request_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`CREATE TYPE "public"."request_durationunit_enum" AS ENUM('MINUTE', 'HOUR', 'DAY', 'WEEK', 'MONTH', 'YEAR')`);
        await queryRunner.query(`CREATE TABLE "request" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "status" "public"."request_status_enum" NOT NULL DEFAULT 'PENDING', "userId" uuid, "productId" uuid, "addressId" uuid, "durationUnit" "public"."request_durationunit_enum" NOT NULL, "durationLength" integer NOT NULL, CONSTRAINT "REL_0f5783657234aa8f7a70e38394" UNIQUE ("productId"), CONSTRAINT "REL_3782dc6d12e6e474d8bab1d080" UNIQUE ("addressId"), CONSTRAINT "PK_167d324701e6867f189aed52e18" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "resource" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "url" character varying NOT NULL, "size" integer NOT NULL, "mimeType" character varying NOT NULL, CONSTRAINT "PK_e2894a5867e06ae2e8889f1173f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('MALE', 'FEMALE', 'OTHER')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "email" character varying NOT NULL, "phone" character varying NOT NULL, "nid" character varying NOT NULL, "gender" "public"."user_gender_enum" NOT NULL, "photoUrlId" uuid, CONSTRAINT "REL_0862c33cdf3d71d3ebe50bf9ca" UNIQUE ("photoUrlId"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "renting_policy" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "shortDescription" character varying NOT NULL, "legalDescription" character varying NOT NULL, "lastUpdated" TIMESTAMP NOT NULL, "userId" uuid, CONSTRAINT "PK_8eed1af4d836b346f01cc5710d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "description" character varying NOT NULL, "title" character varying NOT NULL, "family" character varying NOT NULL, "totalQuantity" integer NOT NULL, "availableQuantity" integer NOT NULL, "lenderId" uuid, "addressId" uuid, CONSTRAINT "REL_fb3cd53102946b4c6c990ff4be" UNIQUE ("addressId"), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_address" ("userId" uuid NOT NULL, "addressId" uuid NOT NULL, CONSTRAINT "PK_b897efdd7f98230001e3c3f81b3" PRIMARY KEY ("userId", "addressId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1abd8badc4a127b0f357d9ecbc" ON "user_address" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_fdd808b709b16efc1dab8df31c" ON "user_address" ("addressId") `);
        await queryRunner.query(`CREATE TABLE "product_renting_policy" ("productId" uuid NOT NULL, "rentingPolicyId" uuid NOT NULL, CONSTRAINT "PK_fc55da0ed41e528b3f7b0e6d2aa" PRIMARY KEY ("productId", "rentingPolicyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08d88677125ea1b2c8777bae6f" ON "product_renting_policy" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_85e7c169f2832a99d02687a65d" ON "product_renting_policy" ("rentingPolicyId") `);
        await queryRunner.query(`CREATE TABLE "product_image_urls" ("productId" uuid NOT NULL, "resourceId" uuid NOT NULL, CONSTRAINT "PK_2796af9d01e74237b99283d2986" PRIMARY KEY ("productId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_340134bb015958dcbd0185a8a8" ON "product_image_urls" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_0aeed190c937a79f7258197eec" ON "product_image_urls" ("resourceId") `);
        await queryRunner.query(`ALTER TABLE "pricing_policy" ADD CONSTRAINT "FK_c0955a9affeb23c489e106f488f" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_38554ade327a061ba620eee948b" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_0f5783657234aa8f7a70e383942" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "request" ADD CONSTRAINT "FK_3782dc6d12e6e474d8bab1d080b" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user" ADD CONSTRAINT "FK_0862c33cdf3d71d3ebe50bf9cad" FOREIGN KEY ("photoUrlId") REFERENCES "resource"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "renting_policy" ADD CONSTRAINT "FK_5d644d8fce685f90691ddc097bc" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tag" ADD CONSTRAINT "FK_f71c88c1df2896fb7d8f6e2adda" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_57ea139177470d2b338e3ed78e2" FOREIGN KEY ("lenderId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_fb3cd53102946b4c6c990ff4bee" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_address" ADD CONSTRAINT "FK_fdd808b709b16efc1dab8df31c1" FOREIGN KEY ("addressId") REFERENCES "address"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_renting_policy" ADD CONSTRAINT "FK_08d88677125ea1b2c8777bae6f5" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_renting_policy" ADD CONSTRAINT "FK_85e7c169f2832a99d02687a65de" FOREIGN KEY ("rentingPolicyId") REFERENCES "renting_policy"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_image_urls" ADD CONSTRAINT "FK_340134bb015958dcbd0185a8a88" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_image_urls" ADD CONSTRAINT "FK_0aeed190c937a79f7258197eec9" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product_image_urls" DROP CONSTRAINT "FK_0aeed190c937a79f7258197eec9"`);
        await queryRunner.query(`ALTER TABLE "product_image_urls" DROP CONSTRAINT "FK_340134bb015958dcbd0185a8a88"`);
        await queryRunner.query(`ALTER TABLE "product_renting_policy" DROP CONSTRAINT "FK_85e7c169f2832a99d02687a65de"`);
        await queryRunner.query(`ALTER TABLE "product_renting_policy" DROP CONSTRAINT "FK_08d88677125ea1b2c8777bae6f5"`);
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_fdd808b709b16efc1dab8df31c1"`);
        await queryRunner.query(`ALTER TABLE "user_address" DROP CONSTRAINT "FK_1abd8badc4a127b0f357d9ecbc2"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_fb3cd53102946b4c6c990ff4bee"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_57ea139177470d2b338e3ed78e2"`);
        await queryRunner.query(`ALTER TABLE "tag" DROP CONSTRAINT "FK_f71c88c1df2896fb7d8f6e2adda"`);
        await queryRunner.query(`ALTER TABLE "renting_policy" DROP CONSTRAINT "FK_5d644d8fce685f90691ddc097bc"`);
        await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_0862c33cdf3d71d3ebe50bf9cad"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_3782dc6d12e6e474d8bab1d080b"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_0f5783657234aa8f7a70e383942"`);
        await queryRunner.query(`ALTER TABLE "request" DROP CONSTRAINT "FK_38554ade327a061ba620eee948b"`);
        await queryRunner.query(`ALTER TABLE "pricing_policy" DROP CONSTRAINT "FK_c0955a9affeb23c489e106f488f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_0aeed190c937a79f7258197eec"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_340134bb015958dcbd0185a8a8"`);
        await queryRunner.query(`DROP TABLE "product_image_urls"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_85e7c169f2832a99d02687a65d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08d88677125ea1b2c8777bae6f"`);
        await queryRunner.query(`DROP TABLE "product_renting_policy"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_fdd808b709b16efc1dab8df31c"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1abd8badc4a127b0f357d9ecbc"`);
        await queryRunner.query(`DROP TABLE "user_address"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "renting_policy"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "resource"`);
        await queryRunner.query(`DROP TABLE "request"`);
        await queryRunner.query(`DROP TYPE "public"."request_durationunit_enum"`);
        await queryRunner.query(`DROP TYPE "public"."request_status_enum"`);
        await queryRunner.query(`DROP TABLE "pricing_policy"`);
        await queryRunner.query(`DROP TYPE "public"."pricing_policy_durationunit_enum"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}

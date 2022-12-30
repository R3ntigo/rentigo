import { MigrationInterface, QueryRunner } from "typeorm";

export class Registration1672377581021 implements MigrationInterface {
    name = 'Registration1672377581021'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "registration" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "nid" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "dob" TIMESTAMP NOT NULL, "status" character varying NOT NULL, "email" character varying, "phone" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_cb23dc9d28df8801b15e9e2b8d6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "IDX_ae6537b002fb8a03cfd62bd637" ON "registration" ("nid") `);
        await queryRunner.query(`CREATE TABLE "registration_image_urls" ("registrationId" uuid NOT NULL, "resourceId" uuid NOT NULL, CONSTRAINT "PK_95f3b1ac27adb8a4dba086553b6" PRIMARY KEY ("registrationId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_570bb542b7c0878f93985de117" ON "registration_image_urls" ("registrationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_cd1b467526b95ca4931fef869a" ON "registration_image_urls" ("resourceId") `);
        await queryRunner.query(`CREATE TABLE "nid_image_urls" ("registrationId" uuid NOT NULL, "resourceId" uuid NOT NULL, CONSTRAINT "PK_8764606e88976cf2f539a2b0896" PRIMARY KEY ("registrationId", "resourceId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_03fadee5ca42db50068b09507e" ON "nid_image_urls" ("registrationId") `);
        await queryRunner.query(`CREATE INDEX "IDX_edadcb498fc0b065275e13c5ca" ON "nid_image_urls" ("resourceId") `);
        await queryRunner.query(`ALTER TABLE "registration_image_urls" ADD CONSTRAINT "FK_570bb542b7c0878f93985de1176" FOREIGN KEY ("registrationId") REFERENCES "registration"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "registration_image_urls" ADD CONSTRAINT "FK_cd1b467526b95ca4931fef869a4" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "nid_image_urls" ADD CONSTRAINT "FK_03fadee5ca42db50068b09507ec" FOREIGN KEY ("registrationId") REFERENCES "registration"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "nid_image_urls" ADD CONSTRAINT "FK_edadcb498fc0b065275e13c5ca5" FOREIGN KEY ("resourceId") REFERENCES "resource"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nid_image_urls" DROP CONSTRAINT "FK_edadcb498fc0b065275e13c5ca5"`);
        await queryRunner.query(`ALTER TABLE "nid_image_urls" DROP CONSTRAINT "FK_03fadee5ca42db50068b09507ec"`);
        await queryRunner.query(`ALTER TABLE "registration_image_urls" DROP CONSTRAINT "FK_cd1b467526b95ca4931fef869a4"`);
        await queryRunner.query(`ALTER TABLE "registration_image_urls" DROP CONSTRAINT "FK_570bb542b7c0878f93985de1176"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_edadcb498fc0b065275e13c5ca"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_03fadee5ca42db50068b09507e"`);
        await queryRunner.query(`DROP TABLE "nid_image_urls"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_cd1b467526b95ca4931fef869a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_570bb542b7c0878f93985de117"`);
        await queryRunner.query(`DROP TABLE "registration_image_urls"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_ae6537b002fb8a03cfd62bd637"`);
        await queryRunner.query(`DROP TABLE "registration"`);
    }

}

import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_product_content_category" AS ENUM('ID printing', 'Readers', 'Access control', 'Biometrics', 'Security', 'Identity tools');
  CREATE TYPE "public"."enum_product_content_related_solution" AS ENUM('access-control', 'time-and-attendance', 'intrusion-alarms', 'visitor-management', 'document-verification', 'mobility-enrollment', 'esignature', 'id-card-printing');
  ALTER TABLE "product_content" ALTER COLUMN "product_slug" SET DATA TYPE varchar;
  ALTER TABLE "product_content" ADD COLUMN "title" varchar;
  ALTER TABLE "product_content" ADD COLUMN "category" "enum_product_content_category" DEFAULT 'Identity tools';
  ALTER TABLE "product_content" ADD COLUMN "summary" varchar;
  ALTER TABLE "product_content" ADD COLUMN "related_solution" "enum_product_content_related_solution";
  DROP TYPE "public"."enum_product_content_product_slug";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_product_content_product_slug" AS ENUM('id-card-printers', 'access-card-readers', 'desktop-smart-card-readers', 'access-controllers', 'biometric-readers', 'intrusion-alarm-systems', 'esignature-pads', 'document-readers', 'mobility-enrollment-kits', 'id-card-accessories');
  ALTER TABLE "product_content" ALTER COLUMN "product_slug" SET DATA TYPE "public"."enum_product_content_product_slug" USING "product_slug"::"public"."enum_product_content_product_slug";
  ALTER TABLE "product_content" DROP COLUMN "title";
  ALTER TABLE "product_content" DROP COLUMN "category";
  ALTER TABLE "product_content" DROP COLUMN "summary";
  ALTER TABLE "product_content" DROP COLUMN "related_solution";
  DROP TYPE "public"."enum_product_content_category";
  DROP TYPE "public"."enum_product_content_related_solution";`)
}

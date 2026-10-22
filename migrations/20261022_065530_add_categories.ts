import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"image_id" integer,
  	"image_path" varchar,
  	"image_alt" varchar NOT NULL,
  	"sort_order" numeric DEFAULT 0 NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "product_content" ADD COLUMN "category_id" integer;
  INSERT INTO "categories" ("name", "slug", "description", "image_path", "image_alt", "sort_order") VALUES
    ('ID printing', 'id-printing', 'ID card printers, credentials and accessories for secure identity programmes.', '/media/id-card-printers.jpg', 'ID card printing equipment', 1),
    ('Readers', 'readers', 'Card and desktop smart-card readers for credential-based applications.', '/media/access-card-readers.jpg', 'Access card readers', 2),
    ('Access control', 'access-control', 'Controllers for integrated physical access-control systems.', '/media/access-controllers.jpg', 'Access control hardware', 3),
    ('Biometrics', 'biometrics', 'Biometric readers and enrollment kits for identity and attendance workflows.', '/media/biometric-readers.jpg', 'Biometric identification devices', 4),
    ('Security', 'security', 'Intrusion detection and alarm equipment to protect premises and assets.', '/media/intrusion-alarm-systems.jpg', 'Intrusion alarm equipment', 5),
    ('Identity tools', 'identity-tools', 'Document readers and eSignature pads for identity verification and digital workflows.', '/media/document-readers.jpg', 'Document verification equipment', 6);
  UPDATE "categories" c SET "image_id" = s."image_id", "image_alt" = COALESCE(NULLIF(s."alt", ''), c."image_alt")
    FROM "site_images" s WHERE s."slot"::text = CASE c."slug"
      WHEN 'id-printing' THEN 'home-category-id-card-printers'
      WHEN 'access-control' THEN 'home-category-access-control'
      WHEN 'biometrics' THEN 'home-category-biometric-readers'
      WHEN 'identity-tools' THEN 'home-category-document-readers'
    END AND s."image_id" IS NOT NULL;
  UPDATE "product_content" p SET "category_id" = c."id" FROM "categories" c
    WHERE c."name" = COALESCE(p."category"::text, 'Identity tools');
  ALTER TABLE "product_content" ALTER COLUMN "category_id" SET NOT NULL;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_image_idx" ON "categories" USING btree ("image_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  ALTER TABLE "product_content" ADD CONSTRAINT "product_content_category_id_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_content_category_idx" ON "product_content" USING btree ("category_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  ALTER TABLE "product_content" DROP COLUMN "category";
  DROP TYPE "public"."enum_product_content_category";`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_product_content_category" AS ENUM('ID printing', 'Readers', 'Access control', 'Biometrics', 'Security', 'Identity tools');
    ALTER TABLE "product_content" ADD COLUMN "category" "enum_product_content_category" DEFAULT 'Identity tools';
    UPDATE "product_content" p SET "category" = (CASE WHEN c."name" IN ('ID printing', 'Readers', 'Access control', 'Biometrics', 'Security', 'Identity tools') THEN c."name" ELSE 'Identity tools' END)::"enum_product_content_category"
      FROM "categories" c WHERE p."category_id" = c."id";
    ALTER TABLE "product_content" DROP CONSTRAINT "product_content_category_id_categories_id_fk";
    ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
    DROP INDEX "product_content_category_idx";
    DROP INDEX "payload_locked_documents_rels_categories_id_idx";
    ALTER TABLE "product_content" DROP COLUMN "category_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";
    DROP TABLE "categories";
  `);
}

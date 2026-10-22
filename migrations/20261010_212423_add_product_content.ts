import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_product_content_product_slug" AS ENUM('id-card-printers', 'access-card-readers', 'desktop-smart-card-readers', 'access-controllers', 'biometric-readers', 'intrusion-alarm-systems', 'esignature-pads', 'document-readers', 'mobility-enrollment-kits', 'id-card-accessories');
  CREATE TABLE "product_content_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "product_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_slug" "enum_product_content_product_slug" NOT NULL,
  	"description" varchar NOT NULL,
  	"specifications" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_content_id" integer;
  ALTER TABLE "product_content_features" ADD CONSTRAINT "product_content_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_content_features_order_idx" ON "product_content_features" USING btree ("_order");
  CREATE INDEX "product_content_features_parent_id_idx" ON "product_content_features" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "product_content_product_slug_idx" ON "product_content" USING btree ("product_slug");
  CREATE INDEX "product_content_updated_at_idx" ON "product_content" USING btree ("updated_at");
  CREATE INDEX "product_content_created_at_idx" ON "product_content" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_content_fk" FOREIGN KEY ("product_content_id") REFERENCES "public"."product_content"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_product_content_id_idx" ON "payload_locked_documents_rels" USING btree ("product_content_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_content_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_content" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_content_features" CASCADE;
  DROP TABLE "product_content" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_content_fk";
  
  DROP INDEX "payload_locked_documents_rels_product_content_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "product_content_id";
  DROP TYPE "public"."enum_product_content_product_slug";`)
}

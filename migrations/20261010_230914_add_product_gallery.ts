import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "product_content_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"media_id" integer
  );
  
  ALTER TABLE "site_settings" ALTER COLUMN "telegram_support" SET DEFAULT 'https://t.me/feysalmama';
  ALTER TABLE "product_content_rels" ADD CONSTRAINT "product_content_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_content_rels" ADD CONSTRAINT "product_content_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "product_content_rels_order_idx" ON "product_content_rels" USING btree ("order");
  CREATE INDEX "product_content_rels_parent_idx" ON "product_content_rels" USING btree ("parent_id");
  CREATE INDEX "product_content_rels_path_idx" ON "product_content_rels" USING btree ("path");
  CREATE INDEX "product_content_rels_media_id_idx" ON "product_content_rels" USING btree ("media_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "product_content_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_content_rels" CASCADE;
  ALTER TABLE "site_settings" ALTER COLUMN "telegram_support" DROP DEFAULT;`)
}

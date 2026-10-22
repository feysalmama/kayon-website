import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_institutions_industry" AS ENUM('banking-and-finance', 'education', 'enterprise', 'government', 'healthcare', 'hospitality', 'manufacturing-and-logistics', 'oil-and-gas', 'retail', 'travel-and-transportation');
  CREATE TABLE "institutions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"industry" "enum_institutions_industry" NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"project_name" varchar NOT NULL,
  	"project_image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "institutions_id" integer;
  ALTER TABLE "institutions" ADD CONSTRAINT "institutions_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "institutions" ADD CONSTRAINT "institutions_project_image_id_media_id_fk" FOREIGN KEY ("project_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "institutions_industry_idx" ON "institutions" USING btree ("industry");
  CREATE INDEX "institutions_logo_idx" ON "institutions" USING btree ("logo_id");
  CREATE INDEX "institutions_project_image_idx" ON "institutions" USING btree ("project_image_id");
  CREATE INDEX "institutions_updated_at_idx" ON "institutions" USING btree ("updated_at");
  CREATE INDEX "institutions_created_at_idx" ON "institutions" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_institutions_fk" FOREIGN KEY ("institutions_id") REFERENCES "public"."institutions"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_institutions_id_idx" ON "payload_locked_documents_rels" USING btree ("institutions_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "institutions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_institutions_fk";
  
  DROP INDEX "payload_locked_documents_rels_institutions_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "institutions_id";
  DROP TABLE "institutions";
  DROP TYPE "public"."enum_institutions_industry";`)
}

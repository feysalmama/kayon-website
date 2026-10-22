import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" ADD COLUMN "whatsapp_support" varchar DEFAULT 'https://wa.me/251930069305';
  ALTER TABLE "site_settings" ADD COLUMN "telegram_support" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "site_settings" DROP COLUMN "whatsapp_support";
  ALTER TABLE "site_settings" DROP COLUMN "telegram_support";`)
}

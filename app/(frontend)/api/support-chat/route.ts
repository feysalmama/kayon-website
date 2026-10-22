import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";
import { defaultSiteSettings } from "@/globals/SiteSettings";

export const dynamic = "force-dynamic";

export async function GET() {
  if (!process.env.DATABASE_URI) {
    return NextResponse.json(
      { configured: false, whatsapp: null, telegram: null },
      { headers: { "Cache-Control": "private, no-store" } },
    );
  }

  const payload = await getPayload({ config });
  const settings = await payload.findGlobal({
    slug: "site-settings",
    overrideAccess: true,
  });

  return NextResponse.json(
    {
      configured: true,
      whatsapp: settings.whatsappSupport || defaultSiteSettings.whatsappSupport,
      telegram: settings.telegramSupport || null,
    },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

import { unstable_cache } from "next/cache";
import { NextResponse } from "next/server";
import { getPayload } from "payload";
import config from "@payload-config";

export const dynamic = "force-dynamic";

type PopulatedMedia = {
  url?: unknown;
  filename?: unknown;
  alt?: unknown;
};

type SiteImageRecord = {
  slot?: unknown;
  alt?: unknown;
  image?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

const getCachedSiteImages = unstable_cache(
  async () => {
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "site-images",
      depth: 1,
      limit: 100,
      overrideAccess: true,
    });
    const images: Record<string, { src: string; alt?: string }> = {};

    for (const item of result.docs as SiteImageRecord[]) {
      if (typeof item.slot !== "string" || !isRecord(item.image)) continue;
      const media = item.image as PopulatedMedia;
      const rawSrc =
        typeof media.url === "string"
          ? media.url
          : typeof media.filename === "string"
            ? `/api/media/file/${encodeURIComponent(media.filename)}`
            : undefined;
      const src = rawSrc
        ? new URL(rawSrc, process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000").pathname
        : undefined;
      if (!src) continue;

      const alt =
        typeof item.alt === "string" && item.alt.trim()
          ? item.alt.trim()
          : typeof media.alt === "string" && media.alt.trim()
            ? media.alt.trim()
            : undefined;
      images[item.slot] = alt ? { src, alt } : { src };
    }

    return images;
  },
  ["site-image-assignments"],
  { revalidate: 300, tags: ["site-images"] },
);

export async function GET() {
  if (!process.env.DATABASE_URI) {
    return NextResponse.json({ configured: false, images: {} });
  }

  await getPayload({ config });
  const images = await getCachedSiteImages();
  return NextResponse.json(
    { configured: true, images },
    { headers: { "Cache-Control": "private, no-store" } },
  );
}

import { cache } from "react";
import { getPayload } from "payload";
import config from "../payload.config.ts";
import type { ProfileBrand } from "@/data/brands";

export type ManagedBrand = ProfileBrand & { description: string };

export const getBrands = cache(async (): Promise<ManagedBrand[]> => {
  const payload = await getPayload({ config });
  const [brands, content] = await Promise.all([
    payload.find({ collection: "brands", pagination: false, depth: 1, sort: "name" }),
    payload.find({ collection: "product-content", pagination: false, depth: 0 }),
  ]);
  return brands.docs.map((brand) => {
    const logo = typeof brand.logo === "object" && brand.logo ? brand.logo : null;
    const rawLogo = logo?.url || (logo?.filename ? `/api/media/file/${encodeURIComponent(logo.filename)}` : brand.logoPath || "");
    return {
      slug: brand.slug, name: brand.name, description: brand.description,
      logo: rawLogo.startsWith("/") || !rawLogo ? rawLogo : new URL(rawLogo).pathname,
      productSlugs: content.docs.filter((product) =>
        (typeof product.brand === "object" && product.brand ? product.brand.id : product.brand) === brand.id
      ).flatMap((product) => product.productSlug ? [product.productSlug] : []),
    };
  });
});

export async function getBrand(slug: string) {
  return (await getBrands()).find((brand) => brand.slug === slug);
}

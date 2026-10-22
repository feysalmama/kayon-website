import { cache } from "react";
import { getPayload } from "payload";
import config from "../payload.config.ts";
import { getCategories } from "@/lib/categories";
import { products as defaults, type CatalogItem } from "@/data/catalog";

export const getProducts = cache(async (): Promise<CatalogItem[]> => {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "product-content", pagination: false, depth: 1, sort: "createdAt" });
  const managed = result.docs.map((content): CatalogItem => {
    if (!content.productSlug) throw new Error("A product is missing its URL slug.");
    const fallback = defaults.find((product) => product.slug === content.productSlug);
    const first = content.images?.[0];
    const media = typeof first === "object" && first ? first : null;
    const rawImage = media?.url || (media?.filename ? `/api/media/file/${encodeURIComponent(media.filename)}` : fallback?.image || "/brand/logo.png");
    return {
      ...(typeof content.brand === "object" && content.brand ? { brand: { name: content.brand.name, slug: content.brand.slug } } : {}),
      slug: content.productSlug,
      title: content.title || fallback?.title || content.productSlug,
      category: typeof content.category === "object" ? content.category.name : "",
      categorySlug: typeof content.category === "object" ? content.category.slug : undefined,
      summary: content.summary || fallback?.summary || content.description.slice(0, 180),
      description: content.description,
      image: rawImage.startsWith("/") ? rawImage : new URL(rawImage).pathname,
      imageAlt: media?.alt || fallback?.imageAlt || content.title || content.productSlug,
      highlights: (content.features ?? []).map((feature) => feature.label),
      relatedSolution: content.relatedSolution || fallback?.relatedSolution || "",
    };
  });
  const categories = await getCategories();
  return [...managed, ...defaults.filter((product) => !managed.some((item) => item.slug === product.slug)).flatMap((product) => {
    const category = categories.find((item) => item.name === product.category);
    return category ? [{ ...product, category: category.name, categorySlug: category.slug }] : [];
  })];
});

export async function getManagedProduct(slug: string) {
  return (await getProducts()).find((product) => product.slug === slug);
}

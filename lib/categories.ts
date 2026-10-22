import { cache } from "react";
import { getPayload } from "payload";
import config from "../payload.config.ts";

export type CatalogCategory = { id: number; name: string; slug: string; description: string; image: string; imageAlt: string };

export const getCategories = cache(async (): Promise<CatalogCategory[]> => {
  const payload = await getPayload({ config });
  const result = await payload.find({ collection: "categories", pagination: false, depth: 1, sort: ["sortOrder", "name"] });
  return result.docs.map((category) => {
    const image = typeof category.image === "object" && category.image ? category.image : null;
    return { id: category.id, name: category.name, slug: category.slug, description: category.description,
      image: image?.url || category.imagePath || "/brand/logo.png", imageAlt: image?.alt || category.imageAlt };
  });
});

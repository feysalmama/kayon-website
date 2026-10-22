import { getPayload } from "payload";
import config from "../payload.config.ts";

export async function getProductDetailContent(productSlug: string) {
  const payload = await getPayload({ config });
  const result = await payload.find({
    collection: "product-content",
    where: {
      productSlug: {
        equals: productSlug,
      },
    },
    depth: 1,
    limit: 1,
  });

  const content = result.docs[0];
  if (!content) return null;

  return {
    brand: typeof content.brand === "object" && content.brand
      ? { name: content.brand.name, slug: content.brand.slug } : null,
    description: content.description,
    specifications: content.specifications ?? "",
    features: (content.features ?? []).map(({ label }) => label),
    images: (content.images ?? []).flatMap((image) => {
      if (typeof image !== "object" || image === null) return [];

      const rawSrc = image.url || (image.filename ? `/api/media/file/${encodeURIComponent(image.filename)}` : null);
      if (typeof rawSrc !== "string") return [];
      const src = rawSrc.startsWith("/")
        ? rawSrc
        : new URL(rawSrc, process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000").pathname;
      const alt = typeof image.alt === "string" && image.alt.trim() ? image.alt.trim() : productSlug;

      return [{ src, alt }];
    }),
  };
}

import path from "node:path";
import { fileURLToPath } from "node:url";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import sharp from "sharp";
import { buildConfig } from "payload";
import type { ProductContent as ProductContentRecord } from "./payload-types.ts";
import { Enquiries } from "./collections/Enquiries.ts";
import { Categories } from "./collections/Categories.ts";
import { Brands } from "./collections/Brands.ts";
import { Institutions } from "./collections/Institutions.ts";
import { Media } from "./collections/Media.ts";
import { ProductContent } from "./collections/ProductContent.ts";
import { SiteImages } from "./collections/SiteImages.ts";
import { Users } from "./collections/Users.ts";
import { products } from "./data/catalog.ts";
import { profileBrands } from "./data/brands.ts";
import { siteImageSlots } from "./data/site-image-slots.ts";
import { SiteSettings, defaultSiteSettings } from "./globals/SiteSettings.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

const payloadSecret =
  process.env.PAYLOAD_SECRET ||
  (process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build"
    ? ""
    : "local-development-secret-change-before-deploy-0123456789");

if (!payloadSecret) {
  throw new Error("PAYLOAD_SECRET must be set to a unique, private value before running the production server.");
}

export default buildConfig({
  secret: payloadSecret,
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: dirname,
    },
  },
  collections: [Users, Media, SiteImages, Brands, Categories, ProductContent, Institutions, Enquiries],
  globals: [SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    push: false,
    pool: {
      connectionString:
        process.env.DATABASE_URI || "postgres://kayon:kayon@localhost:5432/kayon",
    },
  }),
  sharp,
  onInit: async (payload) => {
    if (process.argv.some((argument) => argument === "migrate" || argument.startsWith("migrate:"))) return;
    try {
      await payload.findGlobal({ slug: "site-settings", overrideAccess: true });
    } catch {
      await payload.db.createGlobal({
        slug: "site-settings",
        data: defaultSiteSettings,
      });
    }

    const result = await payload.find({
      collection: "site-images",
      depth: 0,
      limit: 100,
      overrideAccess: true,
    });
    const existingSlots = new Set(result.docs.map((item) => item.slot));

    for (const slot of siteImageSlots) {
      if (existingSlots.has(slot.value)) continue;
      await payload.create({
        collection: "site-images",
        data: { slot: slot.value },
        draft: false,
        overrideAccess: true,
      });
    }

    if (process.env.NEXT_PHASE !== "phase-production-build") {
      const brandResult = await payload.find({ collection: "brands", limit: 1000, depth: 0, overrideAccess: true });
      const brandIds = new Map(brandResult.docs.map((brand) => [brand.slug, brand.id]));
      const seededBrands = new Set<string>();
      for (const brand of profileBrands) {
        if (brandIds.has(brand.slug)) continue;
        const created = await payload.create({
          collection: "brands", overrideAccess: true,
          data: { name: brand.name, slug: brand.slug, logoPath: brand.logo, description: `${brand.name} is featured in Kayon Mountain IT Solutions' company profile.` },
        });
        brandIds.set(brand.slug, created.id);
        seededBrands.add(brand.slug);
      }
      const categoryResult = await payload.find({ collection: "categories", pagination: false, depth: 0, overrideAccess: true });
      const categoryIds = new Map(categoryResult.docs.map((category) => [category.name, category.id]));
      const productContentResult = await payload.find({
        collection: "product-content",
        depth: 0,
        pagination: false,
        overrideAccess: true,
      });
      const existingProductSlugs = new Set(productContentResult.docs.map((item) => item.productSlug));
      for (const content of productContentResult.docs) {
        const legacy = products.find((product) => product.slug === content.productSlug);
        if (!content.title && legacy) {
          await payload.update({ collection: "product-content", id: content.id, overrideAccess: true, data: {
            title: legacy.title, category: content.category || categoryIds.get(legacy.category), summary: legacy.summary,
            relatedSolution: legacy.relatedSolution as ProductContentRecord["relatedSolution"],
          } });
        }
        const brand = profileBrands.find((item) => seededBrands.has(item.slug) && content.productSlug && item.productSlugs.includes(content.productSlug));
        if (!content.brand && brand) {
          await payload.update({ collection: "product-content", id: content.id, overrideAccess: true, data: { brand: brandIds.get(brand.slug) } });
        }
      }

      for (const product of products) {
        if (existingProductSlugs.has(product.slug)) continue;
        const category = categoryIds.get(product.category);
        if (!category) continue;
        const profileBrand = profileBrands.find((brand) => brand.productSlugs.includes(product.slug));
        await payload.create({
          collection: "product-content",
          data: {
            productSlug: product.slug,
            category,
            ...(profileBrand ? { brand: brandIds.get(profileBrand.slug) } : {}),
            description: product.description,
            specifications: "",
            features: product.highlights.map((label) => ({ label })),
          },
          draft: false,
          overrideAccess: true,
        });
      }
    }
  },
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
});

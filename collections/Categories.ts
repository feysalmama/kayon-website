import { ValidationError, type CollectionConfig } from "payload";
import { isAdmin } from "../lib/cms-access.ts";

export const Categories: CollectionConfig = {
  slug: "categories",
  access: { read: () => true, create: isAdmin, update: isAdmin, delete: isAdmin },
  admin: { useAsTitle: "name", defaultColumns: ["name", "image", "sortOrder", "updatedAt"], description: "All categories appear in What we provide. Assign products from the product editor." },
  hooks: {
    beforeValidate: [({ data }) => {
      if (data && !data.slug && data.name) data.slug = data.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      return data;
    }],
    beforeDelete: [async ({ id, req }) => {
      const products = await req.payload.find({ collection: "product-content", where: { category: { equals: id } }, limit: 1, depth: 0, req });
      if (products.totalDocs) throw new ValidationError({ errors: [{ path: "products", message: "Move this category's products to another category before deleting it." }] });
    }],
  },
  fields: [
    { name: "name", type: "text", required: true },
    { name: "slug", type: "text", required: true, unique: true,
      validate: (value: unknown) => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? true : "Use lowercase letters, numbers and single hyphens.",
      admin: { description: "Generated from the name when blank. Keep unchanged to preserve category links." } },
    { name: "description", type: "textarea", required: true },
    { name: "image", type: "upload", relationTo: "media",
      validate: (value: unknown, { siblingData }: { siblingData: { imagePath?: string } }) => value || siblingData?.imagePath ? true : "Upload a category image.",
      admin: { description: "Select or upload an image. Migrated categories use their existing website image until replaced." } },
    { name: "imagePath", type: "text", admin: { hidden: true, readOnly: true } },
    { name: "imageAlt", type: "text", required: true },
    { name: "sortOrder", type: "number", defaultValue: 0, required: true },
    { name: "products", type: "join", collection: "product-content", on: "category", admin: { description: "Products in this category. Edit a product to change its category." } },
  ],
};

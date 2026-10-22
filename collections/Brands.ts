import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/cms-access.ts";

export const Brands: CollectionConfig = {
  slug: "brands",
  access: { read: () => true, create: isAdmin, update: isAdmin, delete: isAdmin },
  admin: { useAsTitle: "name", defaultColumns: ["name", "slug", "updatedAt"] },
  fields: [
    { name: "name", type: "text", required: true },
    {
      name: "slug", type: "text", required: true, unique: true,
      admin: { description: "URL name, for example: hid or entrust-datacard." },
      validate: (value: unknown) => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)
        ? true : "Use lowercase letters, numbers and single hyphens.",
    },
    { name: "description", label: "Brand details", type: "textarea", required: true },
    {
      name: "logo", type: "upload", relationTo: "media",
      validate: (value: unknown, { siblingData }: { siblingData: { logoPath?: string } }) => value || siblingData?.logoPath ? true : "Upload a brand logo.",
      admin: { description: "Select a logo from Media or upload a new one." },
    },
    { name: "logoPath", type: "text", admin: { hidden: true, readOnly: true } },
    {
      name: "products", type: "join", collection: "product-content", on: "brand",
      admin: { description: "Products assigned to this brand. Edit a product to change its brand." },
    },
  ],
};

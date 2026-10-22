import { ValidationError, type CollectionConfig } from "payload";
import { products, solutions } from "../data/catalog.ts";
import { isAdmin } from "../lib/cms-access.ts";

export const ProductContent: CollectionConfig = {
  slug: "product-content",
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "productSlug", "brand", "updatedAt"],
    description: "Manage product descriptions, technical specifications, features and image galleries shown on product detail pages.",
  },
  hooks: {
    beforeValidate: [async ({ data, originalDoc, req }) => {
      if (!data) return data;
      const title = data.title || originalDoc?.title;
      data.productSlug = (data.productSlug || originalDoc?.productSlug || title || "")
        .trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
      const legacy = products.find((product) => product.slug === data.productSlug);
      data.title = title || legacy?.title;
      data.summary = data.summary ?? originalDoc?.summary ?? legacy?.summary ?? "";
      if (!data.title?.trim()) throw new ValidationError({ errors: [{ path: "title", message: "Enter a product name." }] });
      if (data.productSlug) {
        const duplicate = await req.payload.find({
          collection: "product-content", req, depth: 0, limit: 1,
          where: { and: [{ productSlug: { equals: data.productSlug } }, ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : [])] },
        });
        if (duplicate.docs.length) throw new ValidationError({ errors: [{ path: "productSlug", message: "This URL slug is already used. Edit the existing product or choose a different slug for your new product." }] });
      }
      return data;
    }],
  },
  fields: [
    { name: "title", label: "Product name", type: "text", admin: { description: "Name shown in the catalogue and on the product page." } },
    {
      name: "brand", type: "relationship", relationTo: "brands",
      admin: {
        allowCreate: true,
        allowEdit: true,
        description: "Select an existing brand, or create a brand with its logo and details using the + button.",
      },
    },
    {
      name: "productSlug",
      label: "Product URL slug",
      type: "text",
      unique: true,
      validate: (value: unknown) => typeof value === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value) ? true : "Enter a unique URL slug, such as hid-card-printer.",
      admin: {
        description: "Leave blank to generate from the product name. Each product needs a unique slug; existing product URLs should be kept unchanged.",
      },
    },
    { name: "category", type: "relationship", relationTo: "categories", required: true, admin: { allowCreate: true, allowEdit: true, description: "Choose the category this product belongs to, or create one with the + button." } },
    { name: "summary", type: "textarea", admin: { description: "Short catalogue description. Uses the main description if left blank." } },
    { name: "relatedSolution", label: "Related solution", type: "select", options: solutions.map((solution) => ({ label: solution.title, value: solution.slug })) },
    {
      name: "description",
      type: "textarea",
      required: true,
      admin: {
        description: "Description shown in the product detail page's Description tab.",
      },
    },
    {
      name: "specifications",
      type: "textarea",
      admin: {
        description: "Technical specifications shown in the Specifications tab. Leave blank if exact details need confirmation.",
      },
    },
    {
      name: "images",
      label: "Product gallery",
      type: "upload",
      relationTo: "media",
      hasMany: true,
      displayPreview: true,
      admin: {
        allowCreate: true,
        isSortable: true,
        description: "Select images from Media or upload new ones. Preview each image here and drag to reorder. The first image is the main product photo.",
      },
    },
    {
      name: "features",
      type: "array",
      labels: {
        singular: "Feature",
        plural: "Features",
      },
      admin: {
        description: "Feature bullets shown in the Features tab.",
      },
      fields: [
        {
          name: "label",
          type: "text",
          required: true,
        },
      ],
    },
  ],
};

import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/cms-access.ts";
import { siteImageSlots } from "../data/site-image-slots.ts";

export const SiteImages: CollectionConfig = {
  slug: "site-images",
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "slot",
    defaultColumns: ["slot", "image", "updatedAt"],
    description: "Choose an uploaded image for a named website image slot. Leave unassigned slots on their bundled fallback.",
  },
  hooks: {
    afterChange: [() => {
      revalidateTag("site-images", "max");
    }],
    afterDelete: [() => {
      revalidateTag("site-images", "max");
    }],
  },
  fields: [
    {
      name: "slot",
      type: "select",
      required: true,
      unique: true,
      options: [...siteImageSlots],
      admin: {
        description: "Each slot controls the image in the matching location on the public site.",
      },
    },
    {
      name: "image",
      type: "relationship",
      relationTo: "media",
    },
    {
      name: "alt",
      type: "text",
      admin: {
        description: "Optional location-specific accessibility text; otherwise the media item's alt text is used.",
      },
    },
  ],
};

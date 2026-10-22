import path from "node:path";
import { revalidateTag } from "next/cache";
import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/cms-access.ts";

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  admin: {
    useAsTitle: "filename",
    defaultColumns: ["filename", "alt", "updatedAt"],
    description: "Upload and manage optimized source images used across the public website.",
  },
  hooks: {
    afterChange: [() => {
      revalidateTag("site-images", "max");
    }],
    afterDelete: [() => {
      revalidateTag("site-images", "max");
    }],
  },
  upload: {
    staticDir: path.resolve(process.cwd(), "data/uploads"),
    mimeTypes: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    imageSizes: [
      { name: "thumbnail", width: 480, height: 320, fit: "cover" },
      { name: "card", width: 960, height: 720, fit: "inside" },
    ],
    adminThumbnail: "thumbnail",
    filesRequiredOnCreate: true,
  },
  fields: [
    {
      name: "alt",
      type: "text",
      required: true,
      admin: {
        description: "Describe the image for accessibility. For purely decorative images, use a concise visual description.",
      },
    },
    {
      name: "credit",
      type: "text",
      admin: { description: "Optional photographer/source credit for internal reference." },
    },
  ],
};

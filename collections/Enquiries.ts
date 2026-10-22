import type { CollectionConfig } from "payload";
import { isAdmin } from "../lib/cms-access.ts";

export const Enquiries: CollectionConfig = {
  slug: "enquiries",
  defaultSort: "-createdAt",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "company", "email", "interest", "status", "createdAt"],
    description: "Website quote requests and contact enquiries submitted by visitors.",
  },
  access: {
    read: isAdmin,
    create: () => false,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    { name: "name", type: "text", required: true, maxLength: 120 },
    { name: "company", type: "text", maxLength: 160 },
    { name: "email", type: "email", required: true },
    { name: "phone", type: "text", maxLength: 50 },
    { name: "interest", type: "text", maxLength: 200 },
    { name: "products", type: "text", maxLength: 1000 },
    { name: "message", type: "textarea", required: true, maxLength: 5000 },
    {
      name: "status",
      type: "select",
      required: true,
      defaultValue: "new",
      options: [
        { label: "New", value: "new" },
        { label: "In progress", value: "in-progress" },
        { label: "Resolved", value: "resolved" },
      ],
    },
  ],
};

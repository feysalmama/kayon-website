import type { CollectionConfig } from "payload";
import { industries } from "../data/industries.ts";
import { isAdmin } from "../lib/cms-access.ts";

export const Institutions: CollectionConfig = {
  slug: "institutions",
  labels: { singular: "Institution project", plural: "Institutions" },
  access: { read: () => true, create: isAdmin, update: isAdmin, delete: isAdmin },
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "industry", "projectName", "updatedAt"],
    description: "Add institutions we have worked with and their projects. Each record appears on its selected industry detail page. Add another record for another project.",
  },
  fields: [
    {
      name: "industry", type: "select", required: true, index: true,
      options: industries.map((industry) => ({ label: industry.name, value: industry.slug })),
      admin: { description: "Choose the industry page where this institution and project should appear." },
    },
    { name: "name", label: "Institution name", type: "text", required: true },
    {
      name: "logo", label: "Institution logo", type: "upload", relationTo: "media", required: true,
      displayPreview: true, admin: { allowCreate: true, description: "Select an existing logo from Media or upload a new one." },
    },
    { name: "projectName", label: "Project name", type: "text", required: true },
    {
      name: "projectImage", label: "Project image", type: "upload", relationTo: "media", required: true,
      displayPreview: true, admin: { allowCreate: true, description: "Select or upload a photograph of the project." },
    },
  ],
};

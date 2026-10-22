import type { Access, CollectionConfig } from "payload";

const isAdmin: Access = ({ req }) => Boolean(req.user && "isAdmin" in req.user && req.user.isAdmin);

const createFirstAdminOrRequireAdmin: Access = async ({ req }) => {
  if (req.user && "isAdmin" in req.user && req.user.isAdmin) return true;
  const { totalDocs } = await req.payload.count({ collection: "users", overrideAccess: true });
  return totalDocs === 0;
};

export const Users: CollectionConfig = {
  slug: "users",
  auth: true,
  admin: {
    useAsTitle: "email",
    defaultColumns: ["email", "isAdmin", "createdAt"],
  },
  access: {
    read: isAdmin,
    create: createFirstAdminOrRequireAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: "isAdmin",
      type: "checkbox",
      defaultValue: true,
      required: true,
      admin: {
        description: "Administrators can manage uploaded images and image assignments.",
      },
    },
  ],
};

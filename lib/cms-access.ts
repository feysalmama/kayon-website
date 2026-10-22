import type { Access } from "payload";

export const isAdmin: Access = ({ req }) => Boolean(req.user && "isAdmin" in req.user && req.user.isAdmin);

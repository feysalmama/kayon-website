import "@payloadcms/next/css";
import config from "@payload-config";
import { handleServerFunctions, RootLayout } from "@payloadcms/next/layouts";
import { importMap } from "./admin/importMap.js";

export { metadata } from "@payloadcms/next/layouts";

export default function PayloadLayout({ children }: { children: React.ReactNode }) {
  async function serverFunction(args: { name: string; args: Record<string, unknown> }) {
    "use server";
    return handleServerFunctions({ config, importMap, ...args });
  }

  return RootLayout({ children, config, importMap, serverFunction });
}

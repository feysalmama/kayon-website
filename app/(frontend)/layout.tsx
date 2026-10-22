import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteShell } from "@/components/site-shell";
import { getProducts } from "@/lib/products";
import "../globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Kayon Mountain IT Solutions | Secure Identity & Access Control",
    template: "%s | Kayon Mountain IT Solutions",
  },
  description:
    "Identity, access control and security solutions from Kayon Mountain IT Solutions, a system integrator based in Addis Ababa, Ethiopia.",
  openGraph: {
    type: "website",
    siteName: "Kayon Mountain IT Solutions",
    title: "Kayon Mountain IT Solutions | Smart Technology. Secure Identity.",
    description:
      "Explore identity, access control and integrated security solutions from Kayon Mountain IT Solutions in Addis Ababa, Ethiopia.",
    ...(siteUrl ? { images: [{ url: "/brand/logo.png", width: 2152, height: 731, alt: "Kayon Mountain IT Solutions" }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: "Kayon Mountain IT Solutions",
    description: "Secure identity, access control and integrated security solutions.",
    ...(siteUrl ? { images: ["/brand/logo.png"] } : {}),
  },
};

export default async function FrontendRootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const products = await getProducts();
  const organization = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kayon Mountain IT Solutions",
    description:
      "Distributor and system integrator for physical identification, access control and related security solutions.",
    ...(siteUrl ? { image: `${siteUrl}/brand/logo.png` } : {}),
    telephone: "+251930069305",
    email: ["gfuraha24@gmail.com", "Kayonit25@gmail.com"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "Mekanisa Area, Sara Building, 4th Floor",
      addressLocality: "Addis Ababa",
      addressCountry: "ET",
    },
  };

  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <SiteShell products={products} footer={<SiteFooter />}>{children}</SiteShell>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }} />
      </body>
    </html>
  );
}

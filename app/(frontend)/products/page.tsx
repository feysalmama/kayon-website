import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { ProductExplorer } from "@/components/product-explorer";
import { getCategories } from "@/lib/categories";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Products",
  description:
    "Browse ID card printers, card readers, access controllers, biometric devices, intrusion alarms, document readers, eSignature pads and accessories.",
};

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const [products, categories, query] = await Promise.all([getProducts(), getCategories(), searchParams]);
  const initialCategory = typeof query.category === "string" && categories.some((category) => category.slug === query.category) ? query.category : "All";
  return (
    <>
      <PageIntro eyebrow="Our products" title="The right technology for every identity." description="Explore documented products across identification, access control and security. Specific models, technical specifications and availability can be confirmed with our team." />
      <section className="section products-section">
        <div className="container">
          <div className="product-intro-note"><p>Browse the equipment featured in our company profile. We’ll help you explore the available models and find options suited to your requirements.</p><span>Specifications & availability on request</span></div>
          <ProductExplorer key={initialCategory} products={products} categories={categories} initialCategory={initialCategory} />
        </div>
      </section>
    </>
  );
}

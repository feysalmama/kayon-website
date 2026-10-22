import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { BrandDirectory } from "@/components/brand-directory";
import { Reveal } from "@/components/reveal";
import { getBrands } from "@/lib/brands";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Brands",
  description: "Explore Kayon Mountain's technology brands and their products.",
};

export default async function BrandsPage() {
  const brands = await getBrands();
  const products = await getProducts();
  return (
    <>
      <PageIntro eyebrow="Our technology brands" title="Explore our brands." description="Discover our technology brands, learn about each one and explore their products." />
      <section className="section">
        <div className="container">
          <Reveal className="brand-page-note">
            <p>Contact our team to confirm product availability and the right options for your requirements.</p>
          </Reveal>
          <BrandDirectory brands={brands} products={products} />
        </div>
      </section>
    </>
  );
}

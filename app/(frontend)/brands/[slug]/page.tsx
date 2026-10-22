import { Eyebrow } from "@/components/eyebrow";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { getBrand } from "@/lib/brands";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const brand = await getBrand(slug);
  return brand ? { title: brand.name, description: brand.description } : {};
}

export default async function BrandDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const brand = await getBrand(slug);
  if (!brand) notFound();
  const products = await getProducts();
  const relatedProducts = products.filter((product) => brand.productSlugs.includes(product.slug));

  return (
    <>
      <PageIntro eyebrow="Our brands" title={brand.name} description={brand.description} />
      <section className="section">
        <div className="container brand-detail-layout">
          <div className="brand-detail-logo">
            <Image src={brand.logo} alt={`${brand.name} logo`} width={312} height={160} priority />
          </div>
          <div className="brand-detail-copy">
            <Link className="back-link" href="/brands"><ArrowLeft size={15} /> All brands</Link>
            <Eyebrow small>Brand products</Eyebrow>
            <h2>{brand.name}</h2>
            {relatedProducts.length > 0 ? (
              <>
                <p className="detail-description">Explore all products assigned to this brand in our catalogue.</p>
                <div className="related-product-links">
                  {relatedProducts.map((product) => (
                    <Link className="related-product-link" href={`/products/${product.slug}`} key={product.slug}>
                      <span>{product.category}</span><strong>{product.title}</strong><ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              </>
            ) : (
              <div className="spec-note"><strong>No products have been added for this brand yet</strong><p>Contact our team to ask about currently available products and options related to this brand.</p></div>
            )}
            <Link className="button button-primary" href={`/contact?brand=${brand.slug}#enquiry`}>Enquire about {brand.name} <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}

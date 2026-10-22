import { Eyebrow } from "@/components/eyebrow";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { ProductDetailTabs } from "@/components/product-detail-tabs";
import { getManagedProduct } from "@/lib/products";
import { getProductFAQs } from "@/data/faqs";
import { FAQSection } from "@/components/faq-section";
import { AddToQuoteButton } from "@/components/quote-list";
import { PrinterGuide } from "@/components/printer-guide";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { getProductDetailContent } from "@/lib/product-content";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = await getManagedProduct(slug);
  return product
    ? {
        title: product.title,
        description: product.summary,
        openGraph: {
          title: `${product.title} | Kayon Mountain IT Solutions`,
          description: product.summary,
          ...(process.env.NEXT_PUBLIC_SITE_URL ? { images: [product.image] } : {}),
        },
      }
    : {};
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getManagedProduct(slug);
  if (!product) notFound();
  const managedContent = await getProductDetailContent(product.slug);

  return (
    <>
      <PageIntro eyebrow={`Products / ${product.category}`} title={product.title} description={product.summary} />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-image">
            <ProductImageGallery
              images={managedContent?.images ?? []}
              slug={product.slug}
              fallbackSrc={product.image}
              fallbackAlt={product.imageAlt}
              title={product.title}
            />
          </div>
          <div className="detail-copy">
            <Link className="back-link" href="/products"><ArrowLeft size={15} /> All products</Link>
            <Eyebrow small>Product range</Eyebrow>
            <h2>{product.title}</h2>
            {managedContent?.brand && <Link className="text-link" href={`/brands/${managedContent.brand.slug}`}>Brand: {managedContent.brand.name} <ArrowRight size={15} aria-hidden="true" /></Link>}
            <ProductDetailTabs
              title={product.title}
              description={managedContent?.description || product.description}
              specifications={managedContent?.specifications || ""}
              features={managedContent ? managedContent.features : product.highlights}
            />
            <div className="detail-actions product-detail-actions">
              <Link className="button button-primary" href={`/contact?product=${product.slug}#enquiry`}>Enquire about this product <ArrowUpRight size={17} /></Link>
              <AddToQuoteButton slug={product.slug} />
            </div>
            {product.slug === "id-card-printers" && <PrinterGuide />}
          </div>
        </div>
      </section>
      <FAQSection items={getProductFAQs(product.slug)} title={`About ${product.title.toLowerCase()}`} />
      {product.relatedSolution && <section className="section section-paper related-section"><div className="container"><Eyebrow>Related solution</Eyebrow><h2>Explore the system it supports.</h2><Link className="text-link" href={`/solutions/${product.relatedSolution}`}>View related solution <ArrowRight size={16} /></Link></div></section>}
    </>
  );
}

"use client";

import { Eyebrow } from "@/components/eyebrow";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useRef, useState, type ReactNode } from "react";
import type { CatalogItem } from "@/data/catalog";
import type { ProfileBrand } from "@/data/brands";

type BrandMarqueeProps = {
  brands: ProfileBrand[];
  products: CatalogItem[];
  id?: string;
  heading?: ReactNode;
  footer?: ReactNode;
};

export function BrandMarquee({ brands, products, id, heading, footer }: BrandMarqueeProps) {
  const repeatedBrands = [...brands, ...brands];
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [activeBrand, setActiveBrand] = useState<{ slug: string; x: number; y: number } | null>(null);

  const brand = activeBrand ? brands.find((item) => item.slug === activeBrand.slug) : null;
  const relatedProducts = brand ? products.filter((product) => brand.productSlugs.includes(product.slug)) : [];

  const activateBrand = (slug: string, element: HTMLButtonElement) => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const rect = element.getBoundingClientRect();
    const wrapperRect = wrapper.getBoundingClientRect();
    const panelWidth = Math.min(360, window.innerWidth * 0.72);
    const horizontalPadding = panelWidth / 2 + 12;
    const x = rect.left - wrapperRect.left + rect.width / 2;

    setActiveBrand({
      slug,
      x: Math.min(Math.max(x, horizontalPadding), wrapperRect.width - horizontalPadding),
      y: rect.top - wrapperRect.top + rect.height / 2,
    });
  };

  return (
    <section className="section brand-marquee-section" id={id}>
      <div className="container">
        {heading ?? <RevealBrandHeader />}
        <div
          className="brand-marquee-shell"
          ref={wrapperRef}
          onMouseLeave={() => setActiveBrand(null)}
          onBlurCapture={(event) => {
            const nextTarget = event.relatedTarget;
            if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
              setActiveBrand(null);
            }
          }}
        >
          <div className="brand-marquee-viewport">
            <div className="brand-marquee-track" aria-label="Featured brands">
              {repeatedBrands.map((brand, index) => (
                <button
                  key={`${brand.slug}-${index}`}
                  type="button"
                  className="brand-marquee-item"
                  onMouseEnter={(event) => activateBrand(brand.slug, event.currentTarget)}
                  onFocus={(event) => activateBrand(brand.slug, event.currentTarget)}
                  aria-label={`Show details for ${brand.name}`}
                >
                  <Image src={brand.logo} alt={`${brand.name} logo`} width={200} height={110} />
                </button>
              ))}
            </div>
          </div>

          {brand && (
            <div
              className="brand-marquee-modal"
              style={{
                left: activeBrand ? `${activeBrand.x}px` : "50%",
                top: activeBrand ? `${Math.max(activeBrand.y - 90, 14)}px` : "14px",
              }}
            >
              <div className="brand-marquee-modal-top">
                <div className="brand-marquee-modal-logo">
                  <Image src={brand.logo} alt={`${brand.name} logo`} width={180} height={90} />
                </div>
                <div>
                  <Eyebrow small className="brand-mini-eyebrow">Brand profile</Eyebrow>
                  <h3>{brand.name}</h3>
                </div>
              </div>

              {relatedProducts.length > 0 ? (
                <div className="brand-marquee-links">
                  {relatedProducts.map((product) => (
                    <Link href={`/products/${product.slug}`} key={product.slug}>
                      {product.title}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="brand-marquee-note">No products have been added for this brand yet.</p>
              )}

              <div className="brand-marquee-actions">
                <Link className="button button-primary" href={`/brands/${brand.slug}`}>
                  View brand <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
                <Link className="button button-ghost" href={`/contact?brand=${brand.slug}#enquiry`}>
                  Enquire <ArrowUpRight size={15} aria-hidden="true" />
                </Link>
              </div>
            </div>
          )}
        </div>
        {footer}
      </div>
    </section>
  );
}

function RevealBrandHeader() {
  return (
    <div className="section-heading-row brand-marquee-heading">
      <div>
        <Eyebrow>Brands we represent</Eyebrow>
        <h2>Technology partners<br /><span>in our ecosystem.</span></h2>
      </div>
      <div className="heading-aside">
        <p>Discover the trusted names used in our profile and open each brand card to explore associated product links and enquiries.</p>
        <Link className="text-link" href="/brands">View all brands <ArrowRight size={16} /></Link>
      </div>
    </div>
  );
}

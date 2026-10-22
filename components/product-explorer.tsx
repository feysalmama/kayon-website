"use client";

import Link from "next/link";
import { Search, ArrowRight, ArrowUpRight } from "lucide-react";
import { useMemo, useState } from "react";
import { type CatalogItem } from "@/data/catalog";
import type { CatalogCategory } from "@/lib/categories";
import { AddToQuoteButton } from "@/components/quote-list";
import { SiteImage } from "@/components/site-image";

export function ProductExplorer({ products, categories, initialCategory = "All" }: { products: CatalogItem[]; categories: CatalogCategory[]; initialCategory?: string }) {
  const [category, setCategory] = useState(initialCategory);
  function selectCategory(slug: string) {
    setCategory(slug);
    const url = new URL(window.location.href);
    if (slug === "All") url.searchParams.delete("category");
    else url.searchParams.set("category", slug);
    window.history.replaceState(null, "", url);
  }
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "All" || product.categorySlug === category;
      const matchesTerm =
        term.length === 0 ||
        `${product.title} ${product.category} ${product.brand?.name ?? ""} ${product.summary}`.toLowerCase().includes(term);
      return matchesCategory && matchesTerm;
    });
  }, [category, search, products]);

  return (
    <div className="catalog">
      <div className="catalog-toolbar">
        <label className="catalog-search">
          <Search size={19} aria-hidden="true" />
          <span className="sr-only">Search products</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search products, readers, biometrics…"
          />
        </label>
        <p className="results-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "product" : "products"}</p>
      </div>
      <div className="filter-list" role="group" aria-label="Filter products by category">
        {[{ slug: "All", name: "All" }, ...categories].map((item) => (
          <button
            type="button"
            key={item.slug}
            className={`filter-chip${category === item.slug ? " is-selected" : ""}`}
            aria-pressed={category === item.slug}
            onClick={() => selectCategory(item.slug)}
          >
            {item.name}
          </button>
        ))}
      </div>
      {filtered.length > 0 ? (
        <div className="product-grid" aria-live="polite">
          {filtered.map((product, index) => (
            <article className="product-card" key={product.slug} style={{ animationDelay: `${index * 45}ms` }}>
              <Link className="product-image" href={`/products/${product.slug}`} aria-label={`View ${product.title}`}>
                <SiteImage slot={`product-${product.slug}`} fallbackSrc={product.image} alt={product.imageAlt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 30vw" />
                <span className="product-category">{product.category}</span>
                <span className="product-image-arrow" aria-hidden="true"><ArrowUpRight size={18} /></span>
              </Link>
              <div className="product-card-copy">
                <div className="product-brand-row">{product.brand && <Link className="product-brand" href={`/brands/${product.brand.slug}`}>{product.brand.name}</Link>}</div>
                <h2><Link href={`/products/${product.slug}`}>{product.title}</Link></h2>
                <p>{product.summary}</p>
                <div className="product-card-footer">
                  <Link className="text-link" href={`/products/${product.slug}`}>View details <ArrowRight size={15} aria-hidden="true" /></Link>
                  <Link className="icon-link" href={`/contact?product=${product.slug}#enquiry`} aria-label={`Enquire about ${product.title}`}><ArrowUpRight size={17} aria-hidden="true" /></Link>
                </div>
                <AddToQuoteButton slug={product.slug} className="product-quote-button" />
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No matching products</h2>
          <p>Try another search or choose a different category.</p>
          <button className="button button-outline" type="button" onClick={() => { selectCategory("All"); setSearch(""); }}>Clear filters</button>
        </div>
      )}
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { ArrowUpRight, Check, Minus, Plus, Trash2 } from "lucide-react";
import type { CatalogItem } from "@/data/catalog";

type QuoteListContextValue = {
  products: CatalogItem[];
  productSlugs: string[];
  hydrated: boolean;
  storageNotice: string;
  addProduct: (slug: string) => void;
  removeProduct: (slug: string) => void;
  clearProducts: () => void;
};

const QuoteListContext = createContext<QuoteListContextValue | null>(null);
const storageKey = "kayon-quote-list";

export function QuoteListProvider({ children, products }: { children: ReactNode; products: CatalogItem[] }) {
  const [productSlugs, setProductSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [storageNotice, setStorageNotice] = useState("");

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed: unknown = JSON.parse(stored);
        if (!Array.isArray(parsed) || !parsed.every((slug) => typeof slug === "string")) {
          throw new Error("Saved quote list has an invalid format.");
        }
        setProductSlugs(parsed.filter((slug) => products.some((product) => product.slug === slug)));
      }
    } catch (error) {
      console.error("Unable to restore the saved quote list.", error);
      setStorageNotice("Your quote list is available for this visit but could not be restored from this browser.");
    } finally {
      setHydrated(true);
    }
  }, [products]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(productSlugs));
    } catch (error) {
      console.error("Unable to save the quote list in this browser.", error);
      setStorageNotice("Your quote list is available for this visit but cannot be saved in this browser.");
    }
  }, [hydrated, productSlugs]);

  const addProduct = useCallback((slug: string) => {
    if (!products.some((product) => product.slug === slug)) {
      console.error(`Cannot add unknown product "${slug}" to the quote list.`);
      return;
    }
    setProductSlugs((current) => current.includes(slug) ? current : [...current, slug]);
  }, [products]);
  const removeProduct = useCallback((slug: string) => {
    setProductSlugs((current) => current.filter((item) => item !== slug));
  }, []);
  const clearProducts = useCallback(() => setProductSlugs([]), []);

  const value = useMemo(
    () => ({ products, productSlugs, hydrated, storageNotice, addProduct, removeProduct, clearProducts }),
    [products, productSlugs, hydrated, storageNotice, addProduct, removeProduct, clearProducts],
  );

  return <QuoteListContext.Provider value={value}>{children}</QuoteListContext.Provider>;
}

export function useQuoteList() {
  const context = useContext(QuoteListContext);
  if (!context) throw new Error("useQuoteList must be used inside QuoteListProvider.");
  return context;
}

export function AddToQuoteButton({ slug, className = "" }: { slug: string; className?: string }) {
  const { productSlugs, addProduct, removeProduct } = useQuoteList();
  const added = productSlugs.includes(slug);

  return (
    <button
      type="button"
      className={`button ${added ? "button-quote-added" : "button-outline"} ${className}`.trim()}
      aria-pressed={added}
      onClick={() => added ? removeProduct(slug) : addProduct(slug)}
    >
      {added ? <Check size={16} aria-hidden="true" /> : <Plus size={16} aria-hidden="true" />}
      {added ? "Added to quote" : "Add to quote"}
    </button>
  );
}

export function QuoteTray({
  expanded,
  onExpandedChange,
}: {
  expanded: boolean;
  onExpandedChange: (expanded: boolean) => void;
}) {
  const { products, productSlugs, hydrated, storageNotice, removeProduct, clearProducts } = useQuoteList();
  const pathname = usePathname();
  if (!hydrated || productSlugs.length === 0 || pathname === "/contact") return null;

  const selectedProducts = products.filter((product) => productSlugs.includes(product.slug));
  const enquiryUrl = `/contact?products=${encodeURIComponent(productSlugs.join(","))}#enquiry`;

  return (
    <aside className={`quote-tray${expanded ? " is-expanded" : ""}`} aria-label="Your quote list">
      {expanded && (
        <div className="quote-tray-list">
          <div className="quote-tray-list-heading">
            <strong>Products in your enquiry</strong>
            <button type="button" onClick={clearProducts}>Clear list</button>
          </div>
          {selectedProducts.map((product) => (
            <div className="quote-tray-item" key={product.slug}>
              <span>{product.title}</span>
              <button type="button" onClick={() => removeProduct(product.slug)} aria-label={`Remove ${product.title} from quote list`}><Trash2 size={15} /></button>
            </div>
          ))}
          {storageNotice && <p className="quote-storage-notice" role="status">{storageNotice}</p>}
        </div>
      )}
      <div className="quote-tray-bar">
        <button className="quote-tray-toggle" type="button" aria-expanded={expanded} onClick={() => onExpandedChange(!expanded)}>
          <span className="quote-tray-count">{selectedProducts.length}</span>
          <span>Quote list</span>
          {expanded ? <Minus size={15} /> : <Plus size={15} />}
        </button>
        <Link className="button button-primary quote-tray-submit" href={enquiryUrl}>Request quote <ArrowUpRight size={15} /></Link>
      </div>
    </aside>
  );
}

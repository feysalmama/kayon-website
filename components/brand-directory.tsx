import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CatalogItem } from "@/data/catalog";
import type { ManagedBrand } from "@/lib/brands";

export function BrandDirectory({ brands, products }: { brands: ManagedBrand[]; products: CatalogItem[] }) {
  const groups = [
    {
      title: "Brands linked to products in our catalogue",
      description: "Explore the products available under each brand.",
      brands: brands.filter((brand) => brand.productSlugs.length > 0),
    },
    {
      title: "More technology brands",
      description: "Contact our team to discuss products from these brands.",
      brands: brands.filter((brand) => brand.productSlugs.length === 0),
    },
  ];

  return (
    <div className="brand-directory">
      {groups.filter((group) => group.brands.length > 0).map((group) => (
        <section className="brand-group" key={group.title} aria-labelledby={`brand-group-${group.brands[0]?.slug}`}>
          <div className="brand-group-heading">
            <h3 id={`brand-group-${group.brands[0]?.slug}`}>{group.title}</h3>
            <p>{group.description}</p>
          </div>
          <div className="brand-group-grid">
            {group.brands.map((brand) => {
              const relatedProducts = products.filter((product) => brand.productSlugs.includes(product.slug));

              return (
                <article className="brand-directory-card" key={brand.slug}>
                  <div className="brand-directory-head">
                    <div className="brand-logo-frame">
                      <Image className="brand-logo" src={brand.logo} alt={`${brand.name} logo`} width={312} height={160} />
                    </div>
                    <Link className="brand-directory-title" href={`/brands/${brand.slug}`}>
                      <h4>{brand.name}</h4>
                      <span>View brand details</span>
                    </Link>
                  </div>
                  {relatedProducts.length > 0 ? (
                    <div className="brand-product-links">
                      {relatedProducts.map((product) => (
                        <Link href={`/products/${product.slug}`} key={product.slug}>
                          {product.title}<ArrowUpRight size={14} aria-hidden="true" />
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <p className="brand-directory-note">No products have been added for this brand yet.</p>
                  )}
                  <div className="brand-card-actions">
                    <Link className="brand-enquiry-link" href={`/brands/${brand.slug}`}>View brand <ArrowUpRight size={14} aria-hidden="true" /></Link>
                    <Link className="brand-enquiry-link" href={`/contact?brand=${brand.slug}#enquiry`}>
                      Enquire <ArrowUpRight size={14} aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}

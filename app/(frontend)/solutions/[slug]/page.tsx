import { Eyebrow } from "@/components/eyebrow";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { getSolution, solutions } from "@/data/catalog";
import { getProducts } from "@/lib/products";
import { FAQSection } from "@/components/faq-section";
import { getSolutionFAQs } from "@/data/faqs";
import { SiteImage } from "@/components/site-image";

export function generateStaticParams() {
  return solutions.map((solution) => ({ slug: solution.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolution(slug);
  return solution ? { title: solution.title, description: solution.summary } : {};
}

export default async function SolutionDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = getSolution(slug);
  if (!solution) notFound();
  const products = await getProducts();
  const relatedProducts = products.filter((product) => product.relatedSolution === solution.slug);

  return (
    <>
      <PageIntro eyebrow={`Solutions / ${solution.category}`} title={solution.title} description={solution.summary} />
      <section className="section">
        <div className="container detail-layout">
          <div className="detail-image"><SiteImage slot={`solution-${solution.slug}`} fallbackSrc={solution.image} alt={solution.imageAlt} fill sizes="(max-width: 800px) 92vw, 54vw" priority /></div>
          <div className="detail-copy">
            <Link className="back-link" href="/solutions"><ArrowLeft size={15} /> All solutions</Link>
            <Eyebrow small>System integration</Eyebrow>
            <h2>{solution.title}</h2>
            <p className="detail-description">{solution.description}</p>
            <h3>Solution scope</h3>
            <ul className="detail-highlights">{solution.highlights.map((item) => <li key={item}><Check size={17} />{item}</li>)}</ul>
            <div className="spec-note"><strong>Project requirements vary</strong><p>Discuss requirements, device selection, integration, installation and any ongoing support with our team; scope and availability are confirmed for each project.</p></div>
            <Link className="button button-primary" href={`/contact?interest=${solution.slug}#enquiry`}>Discuss this solution <ArrowUpRight size={17} /></Link>
          </div>
        </div>
      </section>
      {relatedProducts.length > 0 && (
        <section className="section section-paper related-products-section">
          <div className="container">
            <Eyebrow>Equipment in our catalogue</Eyebrow>
            <h2>Explore related products.</h2>
            <p className="section-aside">These are related product categories from the supplied company profile. The final configuration depends on your requirements.</p>
            <div className="related-product-links">
              {relatedProducts.map((product) => (
                <Link className="related-product-link" href={`/products/${product.slug}`} key={product.slug}>
                  <span>{product.category}</span><strong>{product.title}</strong><ArrowRight size={16} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
      <section className="section">
        <div className="container solution-steps-panel">
          <Eyebrow>Plan your project with us</Eyebrow>
          <h2>From requirements to a considered configuration.</h2>
          <ol>
            <li><strong>Understand the environment</strong><span>Discuss the site, users and operating workflow.</span></li>
            <li><strong>Review relevant equipment</strong><span>Explore documented product categories and confirm current options.</span></li>
            <li><strong>Scope system integration</strong><span>Agree the components and integration requirements for your project.</span></li>
            <li><strong>Confirm delivery and support</strong><span>Discuss installation and any ongoing support as part of the agreed project scope.</span></li>
          </ol>
        </div>
      </section>
      <FAQSection items={getSolutionFAQs(solution.slug)} title={`Questions about ${solution.title.toLowerCase()}`} />
    </>
  );
}

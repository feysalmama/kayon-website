import { Eyebrow } from "@/components/eyebrow";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Fingerprint, Globe2, Headset, LockKeyhole, ShieldCheck } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";
import { BrandMarquee } from "@/components/brand-marquee";
import { CountUp } from "@/components/count-up";
import { SiteImage } from "@/components/site-image";
import { getProducts } from "@/lib/products";
import { getBrands } from "@/lib/brands";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet Kayon Mountain IT Solutions: an Addis Ababa-based distributor and system integrator for physical identification and access control.",
};

const pillars = [
  { icon: Fingerprint, title: "Secure identification", text: "Physical identification systems built around the needs of each organization." },
  { icon: LockKeyhole, title: "Integrated access", text: "Connected readers, controllers and technologies to manage physical access." },
  { icon: Globe2, title: "MEA perspective", text: "A company based in Addis Ababa, Ethiopia, serving organizations across the MEA region." },
];

const whyKayonFeatures = [
  { icon: Fingerprint, title: "Identity expertise", text: "More than a decade focused on physical identification, credentials and access control." },
  { icon: LockKeyhole, title: "Systems that work together", text: "We bring readers, identity technologies and access systems together around your requirements." },
  { icon: Globe2, title: "Global technology, regional insight", text: "Our MEA perspective helps shape practical solutions for organizations and their environments." },
  { icon: Headset, title: "A partner through the project", text: "From solution planning to integration, our team keeps your operational needs in view." },
];

export default async function AboutPage() {
  const brands = await getBrands();
  const products = await getProducts();
  return (
    <>
      <PageIntro eyebrow="About Kayon Mountain" title="Identification expertise. Built around your needs." description="We are a distributor and system integrator focused on physical identification, access control and tailored security systems—based in Addis Ababa, Ethiopia." />
      <section className="section section-paper">
        <div className="container about-intro-grid">
          <Reveal><Eyebrow>Who we are</Eyebrow><h2>Technology for<br /><span>trusted access.</span></h2></Reveal>
          <Reveal className="about-body-copy" delay={0.08}>
            <p>Kayon Mountain IT Solutions works across the physical identification sector, supplying products and integrating systems that support secure identification and access control. Our experience spans more than a decade, with a focus on practical, tailored solutions for organizations across the MEA region.</p>
            <p>From identity printers and document readers to biometric attendance and access-control systems, we bring the right technologies together for each project’s needs.</p>
            <Link className="text-link" href="/solutions">Explore our solutions <ArrowRight size={16} /></Link>
          </Reveal>
        </div>
        <div className="container capability-grid">
          {pillars.map(({ icon: Icon, title, text }) => (
            <Reveal className="capability-card" key={title}>
              <Icon size={21} aria-hidden="true" />
              <h3>{title}</h3>
              <p>{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
      <section className="section why-kayon-section">
        <div className="container">
          <div className="why-kayon-heading">
            <div>
              <Eyebrow light>Why choose Kayon</Eyebrow>
              <h2>Identity solutions.<br /><span>Thoughtfully delivered.</span></h2>
            </div>
            <div className="why-kayon-intro">
              <p>We pair focused identification expertise with carefully integrated technology and a clear understanding of each organization’s needs.</p>
              <Link className="why-kayon-link" href="/contact#enquiry">Talk to our team <ArrowRight size={16} /></Link>
            </div>
          </div>
          <div className="why-kayon-feature-grid">
            {whyKayonFeatures.map(({ icon: Icon, title, text }, index) => (
              <article className="why-kayon-feature" key={title}>
                <div className="why-kayon-feature-top">
                  <span className="why-kayon-index">0{index + 1}</span>
                  <span className="why-kayon-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.7} /></span>
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal className="section-heading-row">
            <div><Eyebrow>What guides us</Eyebrow><h2>Built on focus.<br /><span>Driven by purpose.</span></h2></div>
            <p className="section-aside">Our vision, mission and goal are drawn from Kayon Mountain’s company profile.</p>
          </Reveal>
          <div className="purpose-grid">
            <Reveal className="purpose-card"><span>01 / VISION</span><h3>Lead through innovation and trust.</h3><p>To be the leading innovator and trusted partner in secure identification and access control solutions across the MEA region, driving digital transformation through cutting-edge technology and unmatched expertise.</p></Reveal>
            <Reveal className="purpose-card" delay={0.06}><span>02 / MISSION</span><h3>Deliver integrated security solutions.</h3><p>As a premier distributor and system integrator, we deliver end-to-end physical identification solutions by leveraging our 10+ years of experience and partnerships with globally acclaimed brands. Our mission is to enhance security, efficiency, and convenience for our clients through customized, reliable, and future-ready identification and access control systems.</p></Reveal>
            <Reveal className="purpose-card" delay={0.12}><span>03 / GOAL</span><h3>Expand leadership through value.</h3><p>To expand our leadership in the MEA region by delivering advanced, secure, and integrated identification solutions while fostering long-term partnerships with global brands and clients. We aim to drive innovation, enhance operational efficiency, and provide exceptional value through tailored access control and identity management systems.</p></Reveal>
          </div>
        </div>
      </section>
      <section className="section section-ink">
        <div className="container">
          <Reveal className="section-heading-row dark-heading">
            <div><Eyebrow light>Our experience</Eyebrow><h2>Over a decade of<br /><span>identity expertise.</span></h2></div>
            <p className="section-aside">Figures below are taken from the company profile. They describe the company as represented in that document.</p>
          </Reveal>
          <div className="about-facts">
            <Reveal><CountUp value={10} /><p>Years in the business</p></Reveal>
            <Reveal delay={0.06}><CountUp value={10} /><p>Strategic partners in MEA</p></Reveal>
            <Reveal delay={0.12}><CountUp value={200} /><p>Successful projects</p></Reveal>
            <Reveal delay={0.18}><CountUp value={500} /><p>Customers and clients</p></Reveal>
          </div>
        </div>
      </section>
      <section className="section about-products-section">
        <div className="container">
          <Reveal className="section-heading-row">
            <div><Eyebrow>Our products</Eyebrow><h2>Technology for your<br /><span>identity needs.</span></h2></div>
            <Link className="text-link" href="/products">Explore all products <ArrowRight size={16} /></Link>
          </Reveal>
          <div className="product-grid about-product-grid">
            {products.slice(0, 4).map((product) => (
              <article className="product-card" key={product.slug}>
                <Link className="product-image" href={`/products/${product.slug}`} aria-label={`View ${product.title}`}>
                  <SiteImage slot={`product-${product.slug}`} fallbackSrc={product.image} alt={product.imageAlt} fill sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 25vw" />
                  <span className="product-category">{product.category}</span>
                </Link>
                <div className="product-card-copy">
                  <div className="product-brand-row">{product.brand && <Link className="product-brand" href={`/brands/${product.brand.slug}`}>{product.brand.name}</Link>}</div>
                  <h3><Link href={`/products/${product.slug}`}>{product.title}</Link></h3>
                  <p>{product.summary}</p>
                  <Link className="text-link" href={`/products/${product.slug}`}>View details <ArrowRight size={15} aria-hidden="true" /></Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <BrandMarquee
        brands={brands}
        products={products}
        id="brands"
        heading={
          <div className="section-heading-row brand-marquee-heading">
            <div><Eyebrow>Our technology brands</Eyebrow><h2>Names featured<br /><span>in our profile.</span></h2></div>
            <div className="heading-aside"><p className="section-aside">Explore the partner names featured in the company profile, with documented product links and availability enquiries.</p><Link className="text-link" href="/brands">Explore our brands <ArrowRight size={16} /></Link></div>
          </div>
        }
        footer={<div className="about-note"><ShieldCheck size={18} /><p>Brand names are shown as they appear in the company profile and are not individual certifications or guarantees of current availability.</p></div>}
      />
      <section className="closing-cta">
        <div className="container closing-inner"><div><Eyebrow light>Work with us</Eyebrow><h2>Let’s make identity<br />work better.</h2></div><Link href="/contact#enquiry" className="button button-light">Talk to our team <ArrowRight size={17} /></Link></div>
      </section>
    </>
  );
}

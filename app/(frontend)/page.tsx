import { Eyebrow } from "@/components/eyebrow";
import { CountUp } from "@/components/count-up";
import { getBrands } from "@/lib/brands";
import { getProducts } from "@/lib/products";

export const dynamic = "force-dynamic";
import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/lib/categories";
import { ArrowDown, ArrowRight, ArrowUpRight, BadgeCheck, Fingerprint, PanelsTopLeft, ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { HeroMedia } from "@/components/hero-media";
import { SiteImage } from "@/components/site-image";
import { IndustryGrid } from "@/components/industry-grid";
import { BrandMarquee } from "@/components/brand-marquee";
import { SolutionGrid } from "@/components/solution-grid";
import { VideoShowcase } from "@/components/video-showcase";

const steps = [
  { number: "01", title: "Start with a conversation", text: "Tell us about your organization, environment and identity or security needs." },
  { number: "02", title: "Shape the right solution", text: "Explore suitable documented products and a configuration tailored to your requirements." },
  { number: "03", title: "Integrate your systems", text: "Kayon Mountain provides system integration for physical identification and access control." },
  { number: "04", title: "Plan what comes next", text: "Discuss delivery, installation and any ongoing support with our team as part of your project scope." },
];

export default async function HomePage() {
  const [brands, products, categories] = await Promise.all([getBrands(), getProducts(), getCategories()]);
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <Reveal className="hero-copy">
            <Eyebrow light>Identity, security and integration</Eyebrow>
            <h1>Smart Technology.<br />Secure Identity.<br /><span>Reliable Solutions.</span></h1>
            <p className="hero-description">Practical identity and security systems, thoughtfully brought together for the way your organization works.</p>
            <div className="hero-actions">
              <Link className="button button-light" href="/contact#enquiry">Request a quote <ArrowUpRight size={17} /></Link>
              <Link className="button button-glass" href="/solutions">Explore our solutions <ArrowRight size={17} /></Link>
            </div>
            <div className="hero-proof"><ShieldCheck size={17} /><span>10+ years in identification and access control</span></div>
          </Reveal>
          <Reveal className="hero-image-wrap" delay={0.15}>
            <HeroMedia />
            <div className="hero-float-card"><span className="hero-float-icon"><Fingerprint size={20} /></span><span><strong>Identity, made practical</strong><small>Integrated for your organization</small></span><ArrowUpRight size={17} /></div>
          </Reveal>
        </div>
        <a className="hero-scroll" href="#showcase"><ArrowDown size={15} /> SCROLL TO EXPLORE</a>
        <div className="hero-bottom-note" aria-hidden="true">ADDIS ABABA · ETHIOPIA</div>
      </section>

      <section className="metrics-strip" aria-label="Company profile highlights">
        <div className="container metrics-grid">
          <div><CountUp value={10} /><p>Years in the business</p></div>
          <div><CountUp value={200} /><p>Successful projects</p></div>
          <div><CountUp value={10} /><p>Strategic partners in MEA</p></div>
          <div><CountUp value={500} /><p>Customers & clients</p></div>
        </div>
      </section>

      <section className="section section-showcase" id="showcase">
        <div className="container showcase-section">
          <Reveal className="section-heading-row">
            <div><Eyebrow>Our solutions</Eyebrow><h2>Technology with a<br /><span>purpose behind it.</span></h2></div>
            <p className="section-aside">Take a closer look at the identity and security systems we bring together for your organization.</p>
          </Reveal>
          <VideoShowcase />
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <Reveal className="section-heading-row">
            <div><Eyebrow>What we provide</Eyebrow><h2>Systems for the moments<br /><span>that matter.</span></h2></div>
            <div className="heading-aside"><p>From the first credential to the final access point, explore solutions for identity, verification and security.</p><Link className="text-link" href="/products">Explore all products <ArrowRight size={16} /></Link></div>
          </Reveal>
          <div className="category-grid">
            {categories.map((category, index) => (
              <Reveal className="category-card" key={category.id} delay={index * 0.045}>
                <Link className="category-image" href={`/products?category=${encodeURIComponent(category.slug)}`}>
                  <Image src={category.image} alt={category.imageAlt} fill sizes="(max-width: 700px) 90vw, (max-width: 1000px) 45vw, 25vw" />
                  <span className="category-arrow"><ArrowUpRight size={19} /></span>
                </Link>
                <div className="category-copy"><h3><Link href={`/products?category=${encodeURIComponent(category.slug)}`}>{category.name}</Link></h3><p>{category.description}</p></div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <BrandMarquee brands={brands} products={products} />

      <section className="section industries-section" id="industries" aria-labelledby="industries-title">
        <div className="container">
          <Reveal className="section-heading-row">
            <div>
              <Eyebrow>Industries we serve</Eyebrow>
              <h2 id="industries-title">Solutions for the sectors<br /><span>that keep us moving.</span></h2>
            </div>
            <p className="section-aside">Explore identity and security capabilities that may suit your environment, then talk to us about your specific requirements.</p>
          </Reveal>
          <IndustryGrid limit={3} />
          <div className="directory-cta"><p>Explore all ten sectors and the related solutions documented for each.</p><Link className="button button-primary" href="/industries">View all industries <ArrowRight size={16} /></Link></div>
        </div>
      </section>

      <section className="section section-ink">
        <div className="container">
          <Reveal className="section-heading-row dark-heading">
            <div><Eyebrow light>How our systems connect</Eyebrow><h2>Security that connects<br /><span>every part.</span></h2></div>
            <div className="heading-aside"><p>End-to-end physical identification, access control and tailored system integration shaped around your needs.</p><Link className="text-link text-link-light" href="/solutions">View all solutions <ArrowRight size={16} /></Link></div>
          </Reveal>
          <SolutionGrid limit={3} />
        </div>
      </section>

      <section className="section section-about-teaser">
        <div className="container teaser-grid">
          <Reveal className="teaser-image-wrap">
            <div className="teaser-image">
              <SiteImage slot="home-about-teaser" fallbackSrc="/media/visitor-management.jpg" alt="Visitor-management solution featured in the company profile" fill sizes="(max-width: 800px) 92vw, 48vw" />
            </div>
            <span className="teaser-image-note">EST. IN ADDIS ABABA, ETHIOPIA</span>
          </Reveal>
          <Reveal className="teaser-copy" delay={0.1}>
            <Eyebrow>About Kayon Mountain</Eyebrow>
            <h2>Your partner in<br /><span>secure identity.</span></h2>
            <p>A distributor and system integrator for physical identification and access control, serving the MEA region from Addis Ababa. We bring together carefully selected technologies and tailored solutions for organizations with real security and identity needs.</p>
            <div className="teaser-points">
              <span><BadgeCheck size={18} /> 10+ years of experience</span>
              <span><PanelsTopLeft size={18} /> Customized system integration</span>
            </div>
            <Link className="button button-outline" href="/about">Get to know us <ArrowRight size={17} /></Link>
          </Reveal>
        </div>
      </section>

      <section className="section section-paper">
        <div className="container">
          <Reveal className="section-heading-row process-heading">
            <div><Eyebrow>How we work</Eyebrow><h2>From first conversation<br /><span>to integrated systems.</span></h2></div>
            <p className="section-aside">The profile describes end-to-end identification solutions and system integration. Confirm installation and ongoing support requirements with our team for your specific project.</p>
          </Reveal>
          <div className="process-grid">
            <span className="process-dot process-dot-first" aria-hidden="true" />
            <span className="process-dot process-dot-center" aria-hidden="true" />
            <span className="process-dot process-dot-last" aria-hidden="true" />
            {steps.map((step, index) => (
              <Reveal className="process-step" key={step.number} delay={index * 0.055}>
                <span className="process-number">{step.number}</span>
                <svg className="process-wave" viewBox="0 0 240 20" preserveAspectRatio="none" aria-hidden="true" focusable="false">
                  <path d="M-60 10 Q-30 0 0 10 T60 10 T120 10 T180 10 T240 10 T300 10" fill="none" stroke="currentColor" strokeWidth="2" />
                </svg>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="closing-cta">
        <div className="container closing-inner">
          <div><Eyebrow light>Talk to our team</Eyebrow><h2>Looking for the right<br />identity solution?</h2><p>Tell us what you need. Our team in Addis Ababa is ready to help you explore the options.</p></div>
          <Link href="/contact#enquiry" className="button button-light">Talk to our team <ArrowUpRight size={18} /></Link>
        </div>
      </section>
    </>
  );
}

import { Eyebrow } from "@/components/eyebrow";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { PageIntro } from "@/components/page-intro";
import { industries, getIndustry } from "@/data/industries";
import { getIndustryInstitutions } from "@/lib/institutions";
import { ImagePreview } from "@/components/image-preview";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  return industry ? { title: industry.name, description: industry.description } : {};
}

export default async function IndustryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();
  const institutions = await getIndustryInstitutions(industry.slug);

  return (
    <>
      <PageIntro eyebrow={`Industries / ${industry.name}`} title={industry.name} description={industry.description} />
      <section className="section">
        <div className="container industry-detail-layout">
          <div className="industry-detail-copy">
            <Link className="back-link" href="/industries"><ArrowLeft size={15} /> All industries</Link>
            <Eyebrow small>Areas to explore</Eyebrow>
            <h2>Identity and security, considered for your environment.</h2>
            <p className="detail-description">The company profile presents Kayon Mountain’s product and service categories across these sectors. The options below are related areas to discuss, not a fixed or guaranteed configuration.</p>
            <ul className="detail-highlights">
              {industry.offerings.map((offering) => (
                <li key={offering.href}>
                  <ArrowRight size={17} />
                  <Link href={offering.href}>{offering.title}<ArrowUpRight size={14} aria-hidden="true" /></Link>
                </li>
              ))}
            </ul>
            <Link className="button button-primary" href={`/contact?industry=${industry.slug}#enquiry`}>Discuss your requirements <ArrowUpRight size={17} /></Link>
          </div>
          <aside className="industry-project-sidebar" aria-label="Institutions and projects">
            <div className="industry-project-heading">
              <Eyebrow>Our work in this sector</Eyebrow>
              <h2>Institutions we’ve worked with</h2>
            </div>
            {institutions.length > 0 ? (
              <ul className="institution-project-list">
                {institutions.map((institution) => (
                  <li className="institution-project-card" key={institution.id}>
                    <div className="institution-project-header">
                      {institution.logo && <div className="institution-logo"><Image src={institution.logo.src} alt={`${institution.name} logo`} width={80} height={64} /></div>}
                      <div><h3>{institution.name}</h3><p>{institution.projectName}</p></div>
                    </div>
                    {institution.projectImage && <div className="institution-project-image"><ImagePreview src={institution.projectImage.src} alt={institution.projectImage.alt} title={`${institution.name} — ${institution.projectName}`} sizes="(max-width: 760px) 92vw, 55vw" /></div>}
                  </li>
                ))}
              </ul>
            ) : <p className="institution-project-empty">Project details for this sector will be added here.</p>}
            <div className="industry-detail-panel">
            <Eyebrow>Talk about your needs</Eyebrow>
            <h3>Start with your environment.</h3>
            <p>Tell us about your organization, users and operational needs. Our team can discuss suitable documented product categories, scope and availability with you.</p>
            <Link className="text-link" href="/contact#enquiry">Contact our team <ArrowRight size={16} /></Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

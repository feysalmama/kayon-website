import { Eyebrow } from "@/components/eyebrow";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/reveal";
import { solutions } from "@/data/catalog";
import { SiteImage } from "@/components/site-image";

export function SolutionGrid({ limit }: { limit?: number }) {
  const items = limit ? solutions.slice(0, limit) : solutions;

  return (
    <div className="solution-grid">
      {items.map((item, index) => (
        <Reveal key={item.slug} delay={index * 0.04} className="solution-card">
          <Link className="solution-image" href={`/solutions/${item.slug}`}>
            <SiteImage slot={`solution-${item.slug}`} fallbackSrc={item.image} alt={item.imageAlt} fill sizes="(max-width: 720px) 90vw, 40vw" />
          </Link>
          <div className="solution-card-copy">
            <Eyebrow small>{item.category}</Eyebrow>
            <h3><Link href={`/solutions/${item.slug}`}>{item.title}</Link></h3>
            <p>{item.summary}</p>
            <Link className="text-link" href={`/solutions/${item.slug}`}>Explore solution <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

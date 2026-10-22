import {
  ArrowRight,
  Building2,
  Factory,
  Fuel,
  GraduationCap,
  Gavel,
  Hospital,
  Hotel,
  Landmark,
  Plane,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/reveal";
import { industries } from "@/data/industries";
import Link from "next/link";

const industryIcons: LucideIcon[] = [
  Landmark,
  GraduationCap,
  Building2,
  Gavel,
  Hospital,
  Hotel,
  Factory,
  Fuel,
  ShoppingBag,
  Plane,
];

export function IndustryGrid({ limit }: { limit?: number }) {
  return (
    <div className="industry-grid">
      {industries.slice(0, limit).map((industry, index) => {
        const Icon = industryIcons[index];

        return (
          <Reveal key={industry.name} className="industry-card" delay={(index % 5) * 0.035}>
            <Link className="industry-card-link" href={`/industries/${industry.slug}`} aria-label={`Learn more about ${industry.name}`}>
            <div className="industry-card-top">
              <span className="industry-icon"><Icon size={21} strokeWidth={1.7} aria-hidden="true" /></span>
              <span className="industry-number">{String(index + 1).padStart(2, "0")}</span>
            </div>
            <h3>{industry.name}</h3>
            <p>{industry.description}</p>
            <span className="industry-learn-link">View sector details <ArrowRight size={13} aria-hidden="true" /></span>
            </Link>
            <div className="industry-offerings" aria-label={`Relevant solutions for ${industry.name}`}>
              {industry.offerings.map((offering) => (
                <Link key={offering.href} href={offering.href}>
                  {offering.title}<ArrowRight size={12} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}

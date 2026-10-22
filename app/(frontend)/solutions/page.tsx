import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { SolutionGrid } from "@/components/solution-grid";

export const metadata: Metadata = {
  title: "Solutions & services",
  description:
    "Explore access control, time and attendance, intrusion alarms, visitor management, document verification, mobility, eSignature and ID card printing.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageIntro eyebrow="Solutions and services" title="Integrated solutions. Real-world needs." description="From physical access and visitor registration to identity verification and card printing, explore services documented in the Kayon Mountain company profile." />
      <section className="section solutions-section">
        <div className="container">
          <p className="solutions-intro">As a system integrator, Kayon Mountain tailors identification and access-control solutions to your organization’s needs. Discuss the scope, equipment and project requirements with our team.</p>
          <SolutionGrid />
        </div>
      </section>
    </>
  );
}

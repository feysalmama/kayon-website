import type { Metadata } from "next";
import { PageIntro } from "@/components/page-intro";
import { IndustryGrid } from "@/components/industry-grid";

export const metadata: Metadata = {
  title: "Industries",
  description: "Explore identity, access-control and security solutions relevant to the sectors Kayon Mountain serves.",
};

export default function IndustriesPage() {
  return (
    <>
      <PageIntro eyebrow="Industries we serve" title="Technology shaped for your sector." description="Explore the industries named in our company profile and the documented product and solution categories that may support their needs." />
      <section className="section industries-directory">
        <div className="container">
          <IndustryGrid />
        </div>
      </section>
    </>
  );
}

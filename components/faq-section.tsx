import { Eyebrow } from "@/components/eyebrow";
import type { FAQ } from "@/data/faqs";
import { Reveal } from "@/components/reveal";

export function FAQSection({ items, title = "Questions, answered." }: { items: FAQ[]; title?: string }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <section className="section faq-section">
      <div className="container faq-layout">
        <Reveal className="faq-heading">
          <Eyebrow>Common questions</Eyebrow>
          <h2>{title}</h2>
          <p>Questions about models, availability or your specific requirements? Please confirm details with our team.</p>
        </Reveal>
        <div className="faq-list">
          {items.map((item, index) => (
            <Reveal className="faq-item" key={item.question} delay={index * 0.035}>
              <details>
                <summary>{item.question}<span aria-hidden="true" /></summary>
                <p>{item.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </section>
  );
}

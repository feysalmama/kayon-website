import { Eyebrow } from "@/components/eyebrow";
import { Reveal } from "@/components/reveal";

export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="page-intro">
      <div className="container">
        <Reveal>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1>{title}</h1>
          <p className="page-intro-copy">{description}</p>
        </Reveal>
      </div>
    </section>
  );
}

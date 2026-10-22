import Link from "next/link";
import Image from "next/image";
import { getPayload } from "payload";
import config from "@payload-config";
import { ArrowUpRight, Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter, Youtube } from "lucide-react";

type SiteSettingsRecord = {
  facebook?: string | null;
  instagram?: string | null;
  linkedin?: string | null;
  x?: string | null;
  youtube?: string | null;
  developedBy?: string | null;
  developerWebsite?: string | null;
};

async function getSiteSettings(): Promise<SiteSettingsRecord> {
  try {
    const payload = await getPayload({ config });
    const settings = await payload.findGlobal({
      slug: "site-settings",
      overrideAccess: true,
    });

    return {
      facebook: typeof settings.facebook === "string" ? settings.facebook : null,
      instagram: typeof settings.instagram === "string" ? settings.instagram : null,
      linkedin: typeof settings.linkedin === "string" ? settings.linkedin : null,
      x: typeof settings.x === "string" ? settings.x : null,
      youtube: typeof settings.youtube === "string" ? settings.youtube : null,
      developedBy: typeof settings.developedBy === "string" && settings.developedBy.trim() ? settings.developedBy.trim() : "Perfonet ICT Solution PLC",
      developerWebsite: typeof settings.developerWebsite === "string" && /^https?:\/\//i.test(settings.developerWebsite.trim()) ? settings.developerWebsite.trim() : null,
    };
  } catch {
    return {
      facebook: null,
      instagram: null,
      linkedin: null,
      x: null,
      youtube: null,
      developedBy: "Perfonet ICT Solution PLC",
    };
  }
}

export async function SiteFooter() {
  const settings = await getSiteSettings();
  const socialLinks = [
    { label: "Facebook", href: settings.facebook, Icon: Facebook },
    { label: "Instagram", href: settings.instagram, Icon: Instagram },
    { label: "LinkedIn", href: settings.linkedin, Icon: Linkedin },
    { label: "X", href: settings.x, Icon: Twitter },
    { label: "YouTube", href: settings.youtube, Icon: Youtube },
  ].filter(
    (link): link is { label: string; href: string; Icon: typeof Facebook } => Boolean(link.href),
  );

  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand-mark footer-brand" href="/" aria-label="Kayon Mountain IT Solutions home">
            <Image src="/brand/logo-footer.png" alt="Kayon Mountain IT Solutions" width={2152} height={731} sizes="240px" />
          </Link>
          <p className="footer-intro">Smarter identity and integrated security systems, thoughtfully delivered.</p>
          <a className="profile-download" href="/brand/company-profile.pdf" download>
            Download company profile <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          {socialLinks.length > 0 && (
            <div className="social-links" aria-label="Social media links">
              {socialLinks.map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                  <Icon size={18} aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="footer-col">
          <p className="footer-title">Explore</p>
          <Link href="/about">About us</Link>
          <Link href="/products">Products</Link>
          <Link href="/solutions">Solutions & services</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/brands">Brands</Link>
          <Link href="/contact">Contact</Link>
        </div>
        <div className="footer-col footer-contact">
          <p className="footer-title">Talk to our team</p>
          <a href="tel:+251930069305"><Phone size={16} aria-hidden="true" /> +251 930 069 305</a>
          <a href="mailto:gfuraha24@gmail.com"><Mail size={16} aria-hidden="true" /> gfuraha24@gmail.com</a>
          <a href="mailto:Kayonit25@gmail.com"><Mail size={16} aria-hidden="true" /> Kayonit25@gmail.com</a>
          <p><MapPin size={16} aria-hidden="true" /> Mekanisa Area, Sara Building, 4th Floor, Addis Ababa, Ethiopia</p>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Kayon Mountain IT Solutions</span>
        <span>Developed by {settings.developerWebsite ? (
          <a className="footer-developer-link" href={settings.developerWebsite}>
            {settings.developedBy || "Perfonet ICT Solution PLC"}
          </a>
        ) : settings.developedBy || "Perfonet ICT Solution PLC"}</span>
      </div>
    </footer>
  );
}

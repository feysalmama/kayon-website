import { Eyebrow } from "@/components/eyebrow";
import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone, ArrowUpRight, Download } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageIntro } from "@/components/page-intro";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Kayon Mountain IT Solutions in Addis Ababa for identity printers, access control, security systems and integration enquiries.",
};

export default function ContactPage() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="Let’s talk about your needs." description="Tell us what you’re working on. Our team in Addis Ababa can help you explore identification, security and system-integration options." />
      <section className="section contact-section">
        <div className="container contact-grid">
          <Reveal className="contact-sidebar">
            <Eyebrow>Get in touch</Eyebrow>
            <h2>A real conversation<br /><span>starts here.</span></h2>
            <p>Call or email the Kayon Mountain team, or prepare an enquiry for your product or service of interest.</p>
            <div className="contact-methods">
              <a href="tel:+251930069305"><span className="contact-icon"><Phone size={20} /></span><span><small>CALL OUR TEAM</small><strong>+251 930 069 305</strong></span><ArrowUpRight size={16} /></a>
              <a href="mailto:gfuraha24@gmail.com"><span className="contact-icon"><Mail size={20} /></span><span><small>EMAIL</small><strong>gfuraha24@gmail.com</strong></span><ArrowUpRight size={16} /></a>
              <a href="mailto:Kayonit25@gmail.com"><span className="contact-icon"><Mail size={20} /></span><span><small>ALTERNATE EMAIL</small><strong>Kayonit25@gmail.com</strong></span><ArrowUpRight size={16} /></a>
            </div>
            <div className="address-card"><MapPin size={18} /><div><small>VISIT US</small><p>Sara Building, 4th Floor<br />Mekanisa Area<br />Addis Ababa, Ethiopia</p></div></div>
            <Link className="profile-download contact-download" href="/brand/company-profile.pdf" download><Download size={16} /> Download company profile</Link>
          </Reveal>
          <Reveal className="contact-form-panel" delay={0.1}>
            <div className="form-panel-heading"><Eyebrow>Send an enquiry</Eyebrow><h2>How can we help?</h2><p>Fields marked <span aria-hidden="true">*</span> are required.</p></div>
            <ContactForm />
          </Reveal>
        </div>
      </section>
      <section className="section section-paper contact-map-section" aria-labelledby="contact-map-title">
        <div className="container">
          <div className="contact-map-heading">
            <div>
              <Eyebrow>Find our office</Eyebrow>
              <h2 id="contact-map-title">Visit us in Addis Ababa.</h2>
              <p>Sara Building, 4th Floor, Mekanisa Area, Addis Ababa, Ethiopia</p>
            </div>
            <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Sara+Building%2C+Mekanisa+Area%2C+Addis+Ababa%2C+Ethiopia" target="_blank" rel="noreferrer">
              Open directions <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="contact-map-frame">
            <iframe
              title="Map showing Sara Building in Mekanisa Area, Addis Ababa"
              src="https://maps.google.com/maps?q=Sara%20Building%2C%20Mekanisa%20Area%2C%20Addis%20Ababa%2C%20Ethiopia&t=&z=15&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
      <section className="section section-paper contact-note-section"><div className="container contact-note"><span>Prefer a direct email?</span><a href="mailto:gfuraha24@gmail.com?subject=Kayon%20Mountain%20IT%20Solutions%20enquiry">Write to our team <ArrowUpRight size={16} /></a></div></section>
    </>
  );
}

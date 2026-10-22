"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useQuoteList } from "@/components/quote-list";
import { solutions } from "@/data/catalog";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About us" },
  { href: "/products", label: "Products" },
  { href: "/solutions", label: "Solutions & services" },
  { href: "/industries", label: "Industries" },
  { href: "/brands", label: "Brands" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("");
  const pathname = usePathname();
  const { products } = useQuoteList();
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const updateHash = () => setActiveHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand-mark" href="/" aria-label="Kayon Mountain IT Solutions home" onClick={() => setOpen(false)}>
          <Image src="/brand/logo.png" alt="Kayon Mountain IT Solutions" width={2152} height={731} priority />
        </Link>
        <button
          ref={menuButton}
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="primary-navigation"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={`primary-nav${open ? " is-open" : ""}`} id="primary-navigation" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape") { setOpen(false); event.currentTarget.querySelectorAll("details[open]").forEach((menu) => menu.removeAttribute("open")); if (open) menuButton.current?.focus(); } }}>
          {links.map((link) => {
            const active =
              link.href === "/"
                ? pathname === "/" && activeHash !== "#industries"
                : link.href.includes("#")
                    ? pathname === link.href.split("#")[0] && activeHash === `#${link.href.split("#")[1]}`
                    : pathname.startsWith(link.href);
            if (link.href === "/products" || link.href === "/solutions") {
              const items = link.href === "/products" ? products : solutions;
              const categories = [...new Set(items.map((item) => item.category))];
              return (
                <details key={link.href} className="nav-menu" onKeyDown={(event) => { if (event.key === "Escape") { event.currentTarget.removeAttribute("open"); event.currentTarget.querySelector("summary")?.focus(); } }} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) event.currentTarget.removeAttribute("open"); }}>
                  <summary className={`nav-link${active ? " is-active" : ""}`} aria-current={active ? "page" : undefined}>{link.label}<ChevronDown size={13} aria-hidden="true" /></summary>
                  <div className="nav-panel">
                    <Link className="nav-panel-all" href={link.href} onClick={(event) => { setOpen(false); event.currentTarget.closest("details")?.removeAttribute("open"); }}>Explore all {link.href === "/products" ? "products" : "solutions"}<ArrowUpRight size={16} /></Link>
                    <div className="nav-panel-grid">{categories.map((category) => (
                      <div className="nav-panel-group" key={category}><p>{category}</p>{items.filter((item) => item.category === category).map((item) => (
                        <Link key={item.slug} href={`${link.href}/${item.slug}`} onClick={(event) => { setOpen(false); event.currentTarget.closest("details")?.removeAttribute("open"); }}>{item.title}</Link>
                      ))}</div>
                    ))}</div>
                  </div>
                </details>
              );
            }
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={active ? "nav-link is-active" : "nav-link"}
                onClick={() => {
                  setOpen(false);
                  setActiveHash(link.href.includes("#") ? `#${link.href.split("#")[1]}` : "");
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link className="button button-primary nav-cta" href="/contact#enquiry" onClick={() => setOpen(false)}>
            Request a quote <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

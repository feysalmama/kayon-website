"use client";

import { Eyebrow } from "@/components/eyebrow";
import Link from "next/link";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { Play, X, VolumeX } from "lucide-react";
import { SiteImage } from "@/components/site-image";

const scenes = [
  { title: "Print with confidence", caption: "ID card printers and secure identity", image: "/media/id-card-printers.jpg", slot: "showcase-printing", alt: "ID card printers from the company profile", video: process.env.NEXT_PUBLIC_PRINTER_VIDEO },
  { title: "Manage every arrival", caption: "Visitor registration and badge printing", image: "/media/visitor-management.jpg", slot: "showcase-visitors", alt: "Visitor-management imagery from the company profile", video: process.env.NEXT_PUBLIC_VISITOR_VIDEO },
  { title: "Connect identity to access", caption: "Readers, controllers and biometrics", image: "/media/biometric-readers.jpg", slot: "showcase-identity", alt: "Biometric identification devices from the company profile", video: process.env.NEXT_PUBLIC_IDENTITY_VIDEO },
];

function FilmModal({ scene, onClose }: { scene: (typeof scenes)[number]; onClose: () => void }) {
  const dialogId = useId();
  const dialogRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "Tab") {
        const items = dialogRef.current?.querySelectorAll<HTMLElement>("button, a[href], video[controls]");
        if (!items?.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      previousFocus.current?.focus();
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section ref={dialogRef} className="film-modal" role="dialog" aria-modal="true" aria-labelledby={dialogId}>
        <div className="film-modal-media">
          {scene.video ? (
            <video className="film-video" controls autoPlay muted loop playsInline preload="none" poster={scene.image} aria-label={`${scene.title}, muted product video`}>
              <source src={scene.video} type="video/mp4" />
              Your browser does not support video playback.
            </video>
          ) : (
            <SiteImage slot={scene.slot} fallbackSrc={scene.image} alt={scene.alt} fill sizes="(max-width: 760px) 92vw, 900px" />
          )}
          <button ref={closeRef} type="button" className="modal-close" onClick={onClose} aria-label="Close video preview"><X size={21} /></button>
        </div>
        <div className="film-modal-copy">
          <Eyebrow>{scene.caption}</Eyebrow>
          <h2 id={dialogId}>{scene.title}</h2>
          <p>{scene.video ? "Take a closer look at the technology behind this solution." : "Explore the technology behind this solution. Our team can help you choose the right equipment for your needs."}</p>
          <Link className="text-link" href="/solutions">Explore our solutions <span aria-hidden="true">→</span></Link>
        </div>
      </section>
    </div>
  );
}

export function VideoShowcase() {
  const [active, setActive] = useState<(typeof scenes)[number] | null>(null);
  const closeModal = useCallback(() => setActive(null), []);
  const scene = scenes[0];

  return (
    <>
      <div className="showcase">
        <button className="showcase-poster" type="button" aria-label="Open the solutions preview" onClick={() => setActive(scene)}>
          <SiteImage slot={scene.slot} fallbackSrc={scene.image} alt={scene.alt} fill sizes="(max-width: 1024px) 92vw, 60vw" />
          <span className="showcase-stamp">{scene.video && <VolumeX size={15} aria-hidden="true" />}{scene.video ? "Muted video" : "Solution preview"}</span>
          <span className="showcase-play" aria-hidden="true"><Play size={20} fill="currentColor" /></span>
          <span className="showcase-caption">{scene.title} <span>{scene.caption}</span></span>
        </button>
        <div className="showcase-control-row">
          <p>Short, visual introductions to the systems we supply.</p>
          <button type="button" className="video-toggle" onClick={() => setActive(scene)}>
            <Play size={16} />
            {scene.video ? "Watch printer video" : "View solution preview"}
          </button>
        </div>
        <div className="scene-list" aria-label="Solution image previews">
          {scenes.map((item) => (
            <button className="scene-button" type="button" key={item.title} onClick={() => setActive(item)}>
              <span className="scene-thumb"><SiteImage slot={item.slot} fallbackSrc={item.image} alt="" fill sizes="64px" /></span>
              <span>{item.title}</span><span>{item.caption}</span><Play size={15} aria-hidden="true" />
            </button>
          ))}
        </div>
      </div>
      {active && <FilmModal scene={active} onClose={closeModal} />}
    </>
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Expand, X } from "lucide-react";
import { useSiteImage } from "@/components/site-image";

export function ImagePreview({ src: fallbackSrc, alt: fallbackAlt, slot = "", title, sizes = "90vw", priority = false }: {
  src: string; alt: string; slot?: string; title: string; sizes?: string; priority?: boolean;
}) {
  const { src, alt } = useSiteImage(slot, fallbackSrc, fallbackAlt);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);
  const close = () => dialog.current?.close();
  return (
    <>
      <button ref={trigger} className="image-preview-trigger" type="button" aria-label={`Enlarge image: ${title}`} onClick={() => { dialog.current?.showModal(); setOpen(true); }}>
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} />
        <span className="image-preview-hint"><Expand size={15} aria-hidden="true" /> Enlarge</span>
      </button>
      <dialog ref={dialog} className="image-preview-dialog" aria-label={title} onClose={() => { setOpen(false); trigger.current?.focus(); }} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
        <div className="image-preview-frame">
          <button type="button" className="image-preview-close" aria-label="Close image preview" onClick={close}><X size={22} aria-hidden="true" /></button>
          {open && <Image src={src} alt={alt} width={1600} height={1100} sizes="95vw" />}
          <p>{title}</p>
        </div>
      </dialog>
    </>
  );
}

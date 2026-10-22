"use client";

import Image from "next/image";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

type ManagedImageEntry = {
  src: string;
  alt?: string;
};

type ManagedImages = Record<string, ManagedImageEntry>;

const ManagedImagesContext = createContext<ManagedImages>({});

export function useSiteImage(slot: string, fallbackSrc: string, alt: string) {
  const images = useContext(ManagedImagesContext);
  return { src: images[slot]?.src || fallbackSrc, alt: images[slot]?.alt || alt };
}

export function ManagedImagesProvider({ children }: { children: ReactNode }) {
  const [images, setImages] = useState<ManagedImages>({});

  useEffect(() => {
    let cancelled = false;

    fetch("/api/site-images", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error(`Image settings request failed with status ${response.status}.`);
        return response.json() as Promise<{ configured: boolean; images: ManagedImages }>;
      })
      .then((result) => {
        if (!result.images || typeof result.images !== "object" || Array.isArray(result.images)) {
          throw new Error("Image settings response has an invalid format.");
        }
        if (!cancelled && result.configured) setImages(result.images);
      })
      .catch((error: unknown) => {
        console.error("Unable to load managed site images; using the bundled image assets.", error);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const value = useMemo(() => images, [images]);

  return <ManagedImagesContext.Provider value={value}>{children}</ManagedImagesContext.Provider>;
}

type SiteImageProps = {
  slot: string;
  fallbackSrc: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

export function SiteImage({
  slot,
  fallbackSrc,
  alt,
  fill = false,
  width,
  height,
  sizes,
  priority,
  className,
}: SiteImageProps) {
  const images = useContext(ManagedImagesContext);
  const managed = images[slot];
  const src = managed?.src || fallbackSrc;

  if (fill) {
    return <Image src={src} alt={managed?.alt || alt} fill sizes={sizes} priority={priority} className={className} />;
  }

  if (typeof width !== "number" || typeof height !== "number") {
    throw new Error("SiteImage requires width and height when fill is false.");
  }

  return <Image src={src} alt={managed?.alt || alt} width={width} height={height} sizes={sizes} priority={priority} className={className} />;
}

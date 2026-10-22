"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePreview } from "@/components/image-preview";

export type ProductGalleryImage = {
  src: string;
  alt: string;
};

type ProductImageGalleryProps = {
  images: ProductGalleryImage[];
  slug: string;
  fallbackSrc: string;
  fallbackAlt: string;
  title: string;
};

export function ProductImageGallery({ images, slug, fallbackSrc, fallbackAlt, title }: ProductImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const thumbnails = useRef<(HTMLButtonElement | null)[]>([]);

  if (images.length === 0) {
    return <div className="product-gallery"><div className="product-gallery-main"><ImagePreview slot={`product-${slug}`} src={fallbackSrc} alt={fallbackAlt} title={title} sizes="(max-width: 800px) 92vw, 54vw" priority /></div></div>;
  }

  const currentIndex = Math.min(activeIndex, images.length - 1);
  const activeImage = images[currentIndex];

  return (
    <div className="product-gallery">
      <div className="product-gallery-main">
        <ImagePreview src={activeImage.src} alt={activeImage.alt} title={title} sizes="(max-width: 800px) 92vw, 54vw" priority />
        {images.length > 1 && (
          <span className="product-gallery-count">{String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
        )}
      </div>
      {images.length > 1 && (
        <div className="product-gallery-thumbnails" role="group" aria-label={`${title} images`}>
          {images.map((image, index) => (
            <button
              key={`${image.src}-${index}`}
              ref={(element) => { thumbnails.current[index] = element; }}
              className={`product-gallery-thumbnail${index === currentIndex ? " is-active" : ""}`}
              type="button"
              aria-label={`Show product image ${index + 1}: ${image.alt}`}
              aria-pressed={index === currentIndex}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(event) => {
                const next = event.key === "ArrowRight" ? (index + 1) % images.length
                  : event.key === "ArrowLeft" ? (index - 1 + images.length) % images.length
                    : event.key === "Home" ? 0 : event.key === "End" ? images.length - 1 : null;
                if (next === null) return;
                event.preventDefault(); setActiveIndex(next); thumbnails.current[next]?.focus();
                thumbnails.current[next]?.scrollIntoView({ block: "nearest", inline: "nearest" });
              }}
            >
              <Image src={image.src} alt="" fill sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

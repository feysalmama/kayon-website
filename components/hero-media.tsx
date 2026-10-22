"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SiteImage } from "@/components/site-image";

export function HeroMedia() {
  const video = process.env.NEXT_PUBLIC_HERO_VIDEO;
  const mediaRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isActive, setIsActive] = useState(true);
  const { scrollYProgress } = useScroll({ target: mediaRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [9, -9]);

  useEffect(() => {
    const element = mediaRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsActive(entry.isIntersecting && document.visibilityState === "visible"),
      { threshold: 0.15 },
    );
    const updateVisibility = () => setIsActive(!document.hidden && element.getBoundingClientRect().bottom > 0 && element.getBoundingClientRect().top < window.innerHeight);
    observer.observe(element);
    document.addEventListener("visibilitychange", updateVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  return (
    <motion.div ref={mediaRef} className="hero-image-frame" style={{ y: reduceMotion ? 0 : y }}>
      <motion.div
        className="hero-media-content"
        animate={reduceMotion || !isActive ? { scale: 1 } : { scale: [1, 1.1, 1.12, 1.1, 1] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: reduceMotion || !isActive ? 0 : Infinity, repeatType: "loop" }}
      >
        {video ? (
          <video
            className="hero-product-video"
            src={video}
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="none"
            poster="/media/id-card-printers.jpg"
            aria-label="Muted, looping video of Kayon Mountain identity solutions"
          />
        ) : (
          <SiteImage
            slot="home-hero"
            fallbackSrc="/media/id-card-printers.jpg"
            alt="Secure ID card printing hardware from the company profile"
            fill
            priority
            sizes="(max-width: 760px) 88vw, 48vw"
          />
        )}
      </motion.div>
      <span className="image-index">{video ? "MUTED LOOP · USE CONTROLS TO PAUSE" : "01 / IDENTITY SYSTEMS · IMAGE PREVIEW"}</span>
    </motion.div>
  );
}

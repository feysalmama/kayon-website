"use client";

import { useEffect, useRef, useState } from "react";

export function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLElement>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const start = performance.now();
      const tick = (now: number) => {
        const progress = reducedMotion ? 1 : Math.min((now - start) / 1600, 1);
        setCount(Math.round(value * (1 - Math.pow(1 - progress, 3))));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.4 });
    observer.observe(element);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value]);

  return <strong ref={ref} aria-label={`${value}+`}><span className="count-up-value" aria-hidden="true">{count}</span><span aria-hidden="true">+</span></strong>;
}

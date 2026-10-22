"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const [navigating, setNavigating] = useState(false);
  const navigationTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const previousPathname = useRef(pathname);

  const finishNavigation = useCallback(() => {
    if (navigationTimeout.current) clearTimeout(navigationTimeout.current);
    navigationTimeout.current = null;
    setNavigating(false);
  }, []);

  useEffect(() => {
    const handleNavigationClick = (event: MouseEvent) => {
      if (reduceMotion || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      if (!(event.target instanceof Element)) return;
      const link = event.target.closest("a[href]");
      if (!(link instanceof HTMLAnchorElement) || link.target === "_blank" || link.hasAttribute("download")) return;

      const destination = new URL(link.href, window.location.href);
      if (destination.origin !== window.location.origin || destination.pathname === window.location.pathname) return;

      setNavigating(true);
      if (navigationTimeout.current) clearTimeout(navigationTimeout.current);
      navigationTimeout.current = setTimeout(finishNavigation, 12000);
    };

    document.addEventListener("click", handleNavigationClick, true);
    return () => document.removeEventListener("click", handleNavigationClick, true);
  }, [finishNavigation, reduceMotion]);

  useEffect(() => {
    if (previousPathname.current !== pathname) {
      previousPathname.current = pathname;
      finishNavigation();
    }
  }, [finishNavigation, pathname]);

  useEffect(() => () => {
    if (navigationTimeout.current) clearTimeout(navigationTimeout.current);
  }, []);

  return (
    <>
      <motion.div
        key={pathname}
        initial={reduceMotion ? false : { opacity: 0, y: 7 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
      <AnimatePresence>
        {navigating && !reduceMotion && (
          <motion.div
            className="page-transition-overlay"
            role="status"
            aria-live="polite"
            aria-label="Loading page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <motion.div
              className="page-transition-logo"
              animate={{ opacity: [0.55, 1, 0.55], scale: [0.97, 1, 0.97] }}
              transition={{ duration: 1.4, ease: "easeInOut", repeat: Infinity }}
            >
              <Image src="/brand/transition-icon.png" alt="" width={540} height={455} sizes="150px" priority />
            </motion.div>
            <span className="sr-only">Loading requested page</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

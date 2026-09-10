"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "./scroll";

/* Patient glide scrolling — Lenis at 1.25s, mirroring the monopo
   transform duration. `anchors: true` makes plain href="#…" links
   (View work, Start a project) glide without extra wiring. */
export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.25,
      anchors: true,
      smoothWheel: true,
    });
    setLenis(lenis);

    let raf = requestAnimationFrame(function loop(time) {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}

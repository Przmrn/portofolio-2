"use client";

import { useEffect, useRef } from "react";

/* Vanta TOPOLOGY hero background — p5 flow-field particles in monochrome
   gray on white, reacting to mouse/touch. The vendored scripts
   (public/scripts) set window.p5 + window.VANTA; this component waits
   for both, constructs the effect on its own layer, and destroys it on
   unmount. Skipped entirely under prefers-reduced-motion (plain white). */
export default function VantaTopology() {
  const ref = useRef(null);
  const effect = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let attempts = 0;

    const ready = () =>
      typeof window !== "undefined" &&
      window.p5 &&
      window.VANTA &&
      typeof window.VANTA.TOPOLOGY === "function";

    const timer = setInterval(() => {
      attempts += 1;
      if (ready()) {
        clearInterval(timer);
        if (cancelled || !ref.current || effect.current) return;
        effect.current = window.VANTA.TOPOLOGY({
          el: ref.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.5,
          scaleMobile: 1.5,
          color: 0xa3a3a3,
          backgroundColor: 0xffffff,
        });
      } else if (attempts > 100) {
        clearInterval(timer);
      }
    }, 100);

    return () => {
      cancelled = true;
      clearInterval(timer);
      if (effect.current) {
        effect.current.destroy();
        effect.current = null;
      }
    };
  }, []);

  return <div ref={ref} className="vanta-topology" aria-hidden="true" />;
}

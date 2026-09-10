"use client";

import { useEffect, useRef, useState } from "react";

/* Patient scroll reveal — cubic-bezier(0.19, 1, 0.22, 1), 0.8–1.25s.
   Thin wrapper: adds .reveal + data-visible when in view. */
export default function Reveal({ children, as: Tag = "div", className = "", delay = 0, style }) {
  const ref = useRef(null);
  /* Always start hidden on both server and client so hydration matches.
     The IntersectionObserver flips in-view elements visible right after
     mount — no flash, no mismatch. */
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${className}`}
      data-visible={visible ? "true" : "false"}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}
    >
      {children}
    </Tag>
  );
}

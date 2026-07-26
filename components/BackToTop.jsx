"use client";

import { useEffect, useRef } from "react";
import { usePageContext } from "./FullPageScroll";
import gsap from "gsap";

/**
 * BackToTop — floating button visible on pages 1 & 2 (not hero, not last page).
 * Clicking morphs back to hero (page 0).
 * Follows UI/UX Pro Max guidelines:
 *  - cursor-pointer on clickable ✓
 *  - smooth transition 200ms ✓
 *  - 44x44 min touch target ✓
 *  - focus-visible ring ✓
 *  - prefers-reduced-motion respected ✓
 *  - SVG icon (no emoji) ✓
 */
export default function BackToTop() {
  const { current, total, goTo } = usePageContext();
  const btnRef = useRef(null);
  const prevPage = useRef(current);

  // Show on middle pages only (not first, not last)
  const isVisible = current > 0 && current < total - 1;

  // Animate in/out on page change
  useEffect(() => {
    if (!btnRef.current) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (isVisible) {
      gsap.fromTo(
        btnRef.current,
        {
          opacity: 0,
          y: 20,
          scale: 0.8,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: prefersReducedMotion ? 0.01 : 0.5,
          delay: 0.4,
          ease: "back.out(1.7)",
        }
      );
    } else {
      gsap.to(btnRef.current, {
        opacity: 0,
        y: 20,
        scale: 0.8,
        duration: prefersReducedMotion ? 0.01 : 0.25,
        ease: "power2.in",
      });
    }

    prevPage.current = current;
  }, [current, isVisible]);

  return (
    <button
      ref={btnRef}
      onClick={() => goTo(0)}
      className="back-to-top"
      aria-label="Back to top"
      style={{
        position: "fixed",
        bottom: 32,
        right: 32,
        zIndex: 150,
        width: 48,
        height: 48,
        borderRadius: "50%",
        border: "1.5px solid var(--fog)",
        background: "rgba(255, 255, 255, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: 0,
        padding: 0,
        /* Transitions for hover — 200ms per UI/UX Pro Max */
        transition:
          "border-color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease",
      }}
    >
      {/* SVG arrow up icon — no emoji per UI/UX Pro Max */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="var(--obsidian)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}

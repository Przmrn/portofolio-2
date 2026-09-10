"use client";

import RotatingBadge from "./RotatingBadge";

/* Full-viewport iridescent hero — the single chromatic surface on the page.
   One monumental headline, centered, breathing against fluid light.
   No subhead, no CTA — per the reference discipline. */
export default function IridescentHero() {
  return (
    <section id="top" className="iridescent-stage" aria-label="Intro">
      <div className="iridescent-stage__media" aria-hidden="true" />
      <div className="iridescent-stage__grain" aria-hidden="true" />
      <div className="iridescent-stage__shade" aria-hidden="true" />

      <div className="hero-center">
        <div className="hero-kicker">
          <span className="text-micro" style={{ color: "rgba(255,255,255,0.85)" }}>
            Full-Stack Developer
          </span>
          <span className="text-micro" style={{ color: "rgba(255,255,255,0.45)" }}>
            ·
          </span>
          <span className="text-micro" style={{ color: "rgba(255,255,255,0.85)" }}>
            Computer Vision Engineer
          </span>
        </div>
        <h1 className="text-display" style={{ color: "#fff" }}>
          A // M
        </h1>
      </div>

      <p className="hero-meta hero-meta--left">
        Banda Aceh, ID
        <br />
        5.5501° N, 95.3222° E
      </p>
      <p className="hero-meta hero-meta--right">
        Portfolio 2025 — 2026
        <br />
        4 selected systems
      </p>

      <RotatingBadge />
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";

/* Circular rotating badge — the system's only typographic ornament.
   Text traces the circumference, rotating at slow tempo. */
export default function RotatingBadge({ dark = false, label = "SCROLL DOWN · SCROLL DOWN · " }) {
  const id = `badge-${dark ? "dark" : "light"}`;
  return (
    <div className={`scroll-badge${dark ? " scroll-badge--dark" : ""}`} aria-hidden="true">
      <svg className="scroll-badge__ring" viewBox="0 0 100 100" width="100%" height="100%">
        <defs>
          <path id={id} d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" fill="none" />
        </defs>
        <text style={{ fontSize: "10.5px", letterSpacing: "2.2px", fill: "currentColor", fontFamily: "var(--font-roobert)" }}>
          <textPath href={`#${id}`}>{label}</textPath>
        </text>
      </svg>
      <span className="scroll-badge__core">↓</span>
    </div>
  );
}

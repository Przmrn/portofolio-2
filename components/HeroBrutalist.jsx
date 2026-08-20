"use client";

import dynamic from "next/dynamic";
import ErrorBoundary from "./ErrorBoundary";
import ScrollIndicator from "./ScrollIndicator";

const AsciiArt = dynamic(
  () => import("./ui/ascii-art").then((mod) => mod.AsciiArt),
  {
    ssr: false,
    loading: () => null,
  }
);

const HERO_ASCII_SRC =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(`
    <svg width="1200" height="1200" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="1200" fill="white" />
      
      <!-- Central Typography Monogram -->
      <g fill="black" font-family="Arial Black, Impact, sans-serif" font-weight="900">
        <text x="600" y="600" font-size="280" letter-spacing="-10" text-anchor="middle" dominant-baseline="central">A//M</text>
      </g>

      <!-- Sleek Accent Lines -->
      <line x1="120" y1="920" x2="1080" y2="280" stroke="black" stroke-width="18" stroke-linecap="round" opacity="0.8" />
      <line x1="180" y1="980" x2="1020" y2="440" stroke="black" stroke-width="8" stroke-linecap="round" opacity="0.4" />

      <!-- Corner Crosshairs -->
      <path d="M 140 200 L 140 140 L 200 140" stroke="black" stroke-width="10" fill="none" />
      <path d="M 1060 200 L 1060 140 L 1000 140" stroke="black" stroke-width="10" fill="none" />
      <path d="M 140 1000 L 140 1060 L 200 1060" stroke="black" stroke-width="10" fill="none" />
      <path d="M 1060 1000 L 1060 1060 L 1000 1060" stroke="black" stroke-width="10" fill="none" />
    </svg>
  `);

export default function HeroBrutalist() {
  return (
    <section
      id="hero"
      style={{
        position: "relative",
        height: "100%",
        overflow: "hidden",
        background: "#ffffff",
      }}
    >
      {/* ── Left text block ────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          left: "5vw",
          top: "50%",
          transform: "translateY(-55%)",
          zIndex: 10,
          pointerEvents: "none",
          maxWidth: "480px",
        }}
      >
        {/* Role metadata */}
        <p className="label-mono--xs" style={{ color: "#c8c8c8", marginBottom: "20px" }}>
          [FULL-STACK DEVELOPER]<br />
          [COMPUTER VISION ENGINEER]
        </p>

        {/* Main heading */}
        <h1
          className="display-heading"
          style={{
            fontSize: "clamp(48px, 8vw, 120px)",
            color: "#080707",
            marginBottom: "24px",
            letterSpacing: "0.042em",
            lineHeight: 0.95,
          }}
        >
          A <span style={{ color: "#ebff00" }}>{"//"}</span> M
        </h1>

        {/* Bio */}
        <p className="body-text" style={{ color: "#383838", maxWidth: "380px", marginBottom: "20px" }}>
            Building full-stack web applications from front-end interfaces to back-end APIs.
        </p>

        {/* Availability */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#ebff00",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
              flexShrink: 0,
            }}
          />
          <span className="label-mono--xs" style={{ color: "#080707" }}>
            AVAILABLE FOR WORK
          </span>
        </div>
      </div>

      {/* ── Top-right metadata ─────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 100,
          right: "5vw",
          zIndex: 10,
          textAlign: "right",
          pointerEvents: "none",
        }}
      >
        <p className="label-mono--xs" style={{ color: "#c8c8c8", lineHeight: 2.0 }}>
          014 — TODAY<br />
          BANDA ACEH, INDONESIA<br />
          5.5501° N, 95.3222° E
        </p>
      </div>

      {/* ── Right graphic block (ASCII Art) ─────────────── */}
      <div
        style={{
          position: "absolute",
          top: "10%",
          right: "2vw",
          width: "48%",
          height: "80%",
          zIndex: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pointerEvents: "auto",
        }}
      >
        <ErrorBoundary fallback={null}>
          <AsciiArt
            src={HERO_ASCII_SRC}
            resolution={92}
            charset="dense"
            color="#080707"
            inverted
            animated={false}
            animationStyle="none"
            fontFamily="'IBM Plex Mono', 'JetBrains Mono', monospace"
            fontWeight={600}
            spotlightRadius={180}
            spotlightColor="#ebff00"
            hoverStrength={22}
            style={{ width: "100%", height: "100%", opacity: 0.94 }}
          />
        </ErrorBoundary>
      </div>

      {/* ── Bottom bar ─────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "16px 5vw",
          borderTop: "1px solid #c8c8c8",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 10,
          pointerEvents: "none",
        }}
      >
        <span className="label-mono--xs" style={{ color: "#c8c8c8" }}>
          PYTHON · LARAVEL · YOLOV8 · REACT · OPENCV
        </span>
      </div>

      {/* ── Scroll Indicator ───────────────────────────── */}
      <ScrollIndicator />
    </section>
  );
}

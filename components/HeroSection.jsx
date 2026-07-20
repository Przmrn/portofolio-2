"use client";
import { useEffect, useState } from "react";
import MagnetLines from "./ui/MagnetLines";

/* ─────────────────────────────────────────────────────────
 *  HeroSection — Light Brutalism
 *  White canvas · stark black type · red accents
 *  Interactive MagnetLines grid beside the title
 *
 *  NOTE: The global <NoiseOverlay /> component already
 *  provides the film-grain overlay across the entire site,
 *  so this component does NOT add its own grain filter.
 * ───────────────────────────────────────────────────────── */

export default function HeroSection() {
  /* ── Prevent MagnetLines from rendering on low-end / mobile ── */
  const [showLines, setShowLines] = useState(false);
  useEffect(() => {
    const ok =
      window.innerWidth >= 768 &&
      (typeof navigator === "undefined" || navigator.hardwareConcurrency > 2);
    setShowLines(ok);
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full overflow-hidden flex flex-col h-screen"
      style={{ backgroundColor: "#ffffff", color: "#000000" }}
    >
      {/* ─────────── TOP BAR ─────────── */}
      {/* ─────────── TOP BAR (Absolute) ─────────── */}
      {/*
       * Corner labels — inset from the section boundary so they have
       * breathing room within the horizontal safe-zone the parent provides.
       * top-3/bottom-3 = 12px internal offset; this is NOT additional viewport
       * padding — the parent <main> already contributes 24px/40px/64px.
       */}
      <div className="absolute top-3 left-3 md:top-4 md:left-4 lg:top-6 lg:left-6 z-20 pointer-events-none">
        {/* Top-left: identity */}
        <div className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.14em] flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "#ff0000" }}
          />
          AMMAR_DEV
        </div>
      </div>

      <div className="absolute top-3 right-3 md:top-4 md:right-4 lg:top-6 lg:right-6 z-20 pointer-events-none text-right">
        {/* Top-right: metadata */}
        <div
          className="font-mono uppercase tracking-[0.14em] leading-relaxed"
          style={{ color: "#ff0000", fontSize: "0.6rem" }}
        >
          <div>LATITUDE: 5.5483° N</div>
          <div>FOCAL DEPTH: YOLOv8</div>
        </div>
      </div>

      {/* ─────────── MAIN CONTENT ─────────── */}
      <div className="relative z-10 flex-1 flex items-center w-full h-full">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] items-center gap-0 w-full">
          {/* ── Left: Typography block ── */}
          <div className="relative z-10">
            <h1
              className="select-none font-black uppercase break-words w-full"
              style={{
                /*
                 * clamp(min, preferred, max):
                 * - min 2.5rem: never smaller than 40px on tiny screens
                 * - 12vw: scales with viewport width
                 * - max 13rem: caps at 208px on large screens
                 * word-break: break-word ensures the text wraps inside
                 * the padded container rather than overflowing it.
                 */
                fontSize: "clamp(2.5rem, 12vw, 13rem)",
                lineHeight: 0.85,
                letterSpacing: "-0.05em",
                fontFamily: "'Inter', system-ui, sans-serif",
                color: "#000000",
                wordBreak: "break-word",
                overflowWrap: "break-word",
              }}
            >
              AMMAR
              <br />
              <span
                className="inline-block mt-1 md:mt-2"
                style={{
                  WebkitTextStroke: "2px #000000",
                  color: "transparent",
                }}
              >
                DEVELOPER
              </span>
            </h1>
          </div>

          {/* ── Right: MagnetLines (decorative, next to title) ── */}
          <div className="hidden lg:flex items-center justify-center pointer-events-auto -ml-12 xl:-ml-20">
            {showLines && (
              <div className="opacity-[0.15]">
                <MagnetLines
                  rows={12}
                  columns={12}
                  containerSize="clamp(280px, 28vw, 420px)"
                  lineColor="#000000"
                  lineWidth="0.5vmin"
                  lineHeight="4vmin"
                  baseAngle={-10}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ─────────── BOTTOM BAR (Absolute) ─────────── */}
      <div className="absolute bottom-3 left-3 md:bottom-4 md:left-4 lg:bottom-6 lg:left-6 z-20 max-w-sm md:max-w-md pointer-events-none">
        {/* Bottom-left: bio + archive */}
        <p
          className="font-mono text-[10px] md:text-xs tracking-[0.02em] leading-relaxed mb-4 break-words"
          style={{ color: "#444444" }}
        >
          Full-Stack Developer &amp; Computer Vision Engineer — building
          systems that matter with clean code and quiet precision.
        </p>

        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0 animate-pulse"
            style={{ backgroundColor: "#ff0000" }}
          />
          <span
            className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.14em]"
            style={{ color: "#ff0000" }}
          >
            AVAILABLE FOR FREELANCE
          </span>
        </div>

        <div className="font-mono text-[10px] md:text-xs tracking-[0.14em] uppercase leading-loose">
          <p style={{ opacity: 0.4 }}>[ ARCHIVE 2026 ]</p>
          <p style={{ opacity: 0.3 }}>
            COMPUTER VISION &amp; BACKEND SYSTEMS
          </p>
        </div>
      </div>

      <div className="absolute bottom-3 right-3 md:bottom-4 md:right-4 lg:bottom-6 lg:right-6 z-20">
        {/* Bottom-right: CTA */}
        <a
          href="#projects"
          className="inline-block pointer-events-auto font-mono font-bold text-[10px] md:text-xs uppercase tracking-[0.14em] px-6 py-3 md:px-8 md:py-4 transition-all duration-300 cursor-pointer hover:-translate-y-1"
          style={{
            backgroundColor: "#000000",
            color: "#ffffff",
            clipPath:
              "polygon(0 0, 100% 0, 100% 70%, 85% 100%, 0 100%)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#ff0000";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#000000";
          }}
        >
          EXPLORE DEPTH
        </a>
      </div>

      {/* ── Scroll hint line ── */}
      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 w-px h-[60px] z-10"
        style={{
          background: "linear-gradient(to bottom, #000000, transparent)",
          animation: "topo-flow 2s infinite ease-in-out",
        }}
      />

      {/* ── Scoped keyframes ── */}
      <style>{`
        @keyframes topo-flow {
          0%, 100% { transform: scaleY(0); transform-origin: top; }
          50%      { transform: scaleY(1); transform-origin: top; }
          51%      { transform: scaleY(1); transform-origin: bottom; }
        }
      `}</style>
    </section>
  );
}

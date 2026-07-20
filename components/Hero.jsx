"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

/* ── Spline: SSR-safe dynamic import (avoids hydration errors) ── */
const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
  /* ── Device capability check — skip Spline on mobile / low-end ── */
  const [canRender3D, setCanRender3D] = useState(false);
  const [splineLoaded, setSplineLoaded] = useState(false);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const isLowEnd =
      typeof navigator !== "undefined" && navigator.hardwareConcurrency <= 2;
    setCanRender3D(!isMobile && !isLowEnd);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position:   "relative",
        height:     "100vh",
        background: "#E8E8E5",
        overflow:   "hidden",
      }}
    >
      {/* ── Eyebrow + status — top right ─────────────────── */}
      <motion.div
        {...fadeUp(0.3)}
        style={{
          position:  "absolute",
          top:       "88px",
          right:     "5vw",
          zIndex:    10,
          textAlign: "right",
          pointerEvents: "none",
        }}
      >
        <p style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      "0.68rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "#888888",
          lineHeight:    1.9,
        }}>
          Full-Stack Developer<br />
          Computer Vision Engineer<br />
          <span
            style={{
              color:       "#FF2D00",
              fontWeight:  500,
              display:     "flex",
              alignItems:  "center",
              gap:         "6px",
              justifyContent: "flex-end",
              marginTop:   "4px",
            }}
          >
            <span
              style={{
                width:     7,
                height:    7,
                borderRadius: "50%",
                background: "#FF2D00",
                display:   "inline-block",
                animation: "pulse-dot 2s ease-in-out infinite",
                flexShrink: 0,
              }}
            />
            Available for work
          </span>
        </p>
      </motion.div>

      {/* ── Massive AMMAR — left, vertically centered ────── */}
      <motion.div
        initial={{ opacity: 0, x: -32 }}
        animate={{ opacity: 1,  x:   0 }}
        transition={{ duration: 1.1, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:  "absolute",
          left:      "4vw",
          top:       "50%",
          transform: "translateY(-52%)",
          zIndex:    10,
          pointerEvents: "none",
        }}
      >
        <h1
          style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontWeight:    700,
            /* clamp so it never bleeds on small screens */
            fontSize:      "clamp(80px, 20vw, 290px)",
            letterSpacing: "-0.045em",
            lineHeight:    0.84,
            color:         "#111111",
            userSelect:    "none",
          }}
        >
          AM<br />MAR
        </h1>
      </motion.div>

      {/* ── Spline 3D scene — positioned next to the hero name ── */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: splineLoaded ? 1 : 0, scale: 1 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "absolute",
          top:      0,
          right:    0,
          width:    "60%",
          height:   "100%",
          zIndex:   2,
        }}
      >
        {canRender3D && (
          <Spline
            scene="https://prod.spline.design/NOnlHZHEI7OUUNuc/scene.splinecode"
            onLoad={() => setSplineLoaded(true)}
            style={{
              width:   "100%",
              height:  "100%",
              display: "block",
            }}
          />
        )}
      </motion.div>

      {/* ── Bottom info strip ─────────────────────────────── */}
      <motion.div
        {...fadeUp(1.0)}
        style={{
          position:       "absolute",
          bottom:         0,
          left:           0,
          right:          0,
          padding:        "3px 5vw",
          borderTop:      "1px solid #CCCCCA",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          zIndex:         10,
          pointerEvents:  "none",
        }}
      >
        <span style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "#888888",
        }}>
          Python · Laravel · YOLOv8 · React · OpenCV
        </span>
        <span style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      "0.62rem",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color:         "#888888",
        }}>
          Scroll ↓
        </span>
      </motion.div>
    </section>
  );
}
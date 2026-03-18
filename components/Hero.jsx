"use client";
import { motion } from "framer-motion";
import MagnetLines from "./MagnetLines";

const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 28 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
});

export default function Hero() {
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
          zIndex:    5,
          textAlign: "right",
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
          zIndex:    4,
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

      {/* ── MagnetLines — dead center ─────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5 }}
        style={{
          position:  "absolute",
          top:       "50%",
          left:      "50%",
          transform: "translate(-50%, -50%)",
          zIndex:    10,
        }}
      >
        <MagnetLines
          rows={13}
          cols={20}
          cellSize={34}
          lineLength={20}
          lineColor="#111111"
          lineOpacity={0.22}
          maxDist={220}
        />
      </motion.div>

      {/* ── Bottom info strip ─────────────────────────────── */}
      <motion.div
        {...fadeUp(1.0)}
        style={{
          position:       "absolute",
          bottom:         0,
          left:           0,
          right:          0,
          padding:        "18px 5vw",
          borderTop:      "1px solid #CCCCCA",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          zIndex:         5,
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
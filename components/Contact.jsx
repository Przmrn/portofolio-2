"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Contact() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "#E8E8E5",
        padding:    "100px 5vw 80px",
        borderTop:  "1px solid #CCCCCA",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontSize:      "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#888888",
            marginBottom:  "28px",
          }}
        >
          Contact
        </p>

        <h2
          style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontWeight:    700,
            fontSize:      "clamp(56px, 11vw, 172px)",
            letterSpacing: "-0.05em",
            lineHeight:    0.84,
            color:         "#111111",
            marginBottom:  "64px",
          }}
        >
          {"LET'S"}
          <br />
          BUILD
          <br />
          <span style={{ color: "#FF2D00" }}>IT.</span>
        </h2>

        <div
          style={{
            display:    "flex",
            gap:        "20px",
            flexWrap:   "wrap",
            alignItems: "center",
            borderTop:  "1px solid #CCCCCA",
            paddingTop: "40px",
          }}
        >
          <a
            href="mailto:amarnfl238@gmail.com"
            style={{
              fontFamily:     "'Space Grotesk', sans-serif",
              fontSize:       "0.7rem",
              fontWeight:     500,
              letterSpacing:  "0.14em",
              textTransform:  "uppercase",
              color:          "#E8E8E5",
              textDecoration: "none",
              background:     "#111111",
              padding:        "14px 32px",
              display:        "inline-block",
              transition:     "background 0.25s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "#FF2D00";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "#111111";
            }}
          >
            GET IN TOUCH
          </a>

          {["LinkedIn", "GitHub"].map((label) => (
            <a
              key={label}
              href="#"
              style={{
                fontFamily:     "'Space Grotesk', sans-serif",
                fontSize:       "0.7rem",
                letterSpacing:  "0.12em",
                textTransform:  "uppercase",
                color:          "#888888",
                textDecoration: "none",
                padding:        "14px 0",
                transition:     "color 0.2s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#111111";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#888888";
              }}
            >
              {label}{" ↗"}
            </a>
          ))}
        </div>
      </motion.div>

      <div
        style={{
          marginTop:      "100px",
          paddingTop:     "24px",
          borderTop:      "1px solid #CCCCCA",
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "center",
          flexWrap:       "wrap",
          gap:            "12px",
        }}
      >
        <span
          style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontSize:      "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         "#AAAAAA",
          }}
        >
          2026 Ammar — All Rights Reserved
        </span>

        <span
          style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontSize:      "0.6rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color:         "#AAAAAA",
            display:       "flex",
            alignItems:    "center",
            gap:           "8px",
          }}
        >
          <span
            style={{
              width:        6,
              height:       6,
              borderRadius: "50%",
              background:   "#FF2D00",
              display:      "inline-block",
              animation:    "pulse-dot 2s ease-in-out infinite",
            }}
          />
          Available for work
        </span>
      </div>
    </section>
  );
}
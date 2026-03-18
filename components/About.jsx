"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const SKILLS = [
  { area: "Web Development",   items: ["Laravel", "PHP", "React", "Next.js", "MySQL"] },
  { area: "Data & Vision",     items: ["Python", "YOLOv8", "OpenCV", "TensorFlow", "Pandas"] },
  { area: "Design & Tooling",  items: ["Figma", "Tailwind", "Git", "Linux", "REST APIs"] },
];

const STATS = [
  { num: "2+", label: "Years Exp." },
  { num: "4",  label: "Projects"   },
  { num: "3",  label: "Domains"    },
  { num: "∞",  label: "Curiosity"  },
];

export default function About() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const slide = (delay = 0) => ({
    initial:    { opacity: 0, y: 36 },
    animate:    inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="about"
      ref={ref}
      style={{ background: "#111111", padding: "100px 5vw 120px" }}
    >
      <div
        className="about-grid"
        style={{
          display:             "grid",
          gridTemplateColumns: "1fr 1fr",
          gap:                 "80px",
          alignItems:          "start",
        }}
      >
        {/* ── Left ──────────────────────────────── */}
        <motion.div {...slide(0)}>
          <p style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontSize:      "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color:         "#444444",
            marginBottom:  "28px",
          }}>
            About
          </p>

          <h2 style={{
            fontFamily:    "'Space Grotesk', sans-serif",
            fontWeight:    700,
            fontSize:      "clamp(40px, 5.5vw, 80px)",
            letterSpacing: "-0.045em",
            lineHeight:    0.88,
            color:         "#E8E8E5",
            marginBottom:  "40px",
          }}>
            BUILDING<br />
            SYSTEMS<br />
            THAT WORK<span style={{ color: "#FF2D00" }}>.</span>
          </h2>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize:   "0.95rem",
            color:      "#666666",
            lineHeight: 1.78,
            fontWeight: 300,
            maxWidth:   "420px",
            marginBottom: "20px",
          }}>
            IT student from Banda Aceh, Indonesia. I work at the intersection of computer vision, full-stack web development, and real-world deployment.
          </p>

          <p style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize:   "0.95rem",
            color:      "#666666",
            lineHeight: 1.78,
            fontWeight: 300,
            maxWidth:   "420px",
          }}>
            I care about code that ships — not just demos. Every project is built with reliability, data integrity, and the end user in mind.
          </p>
        </motion.div>

        {/* ── Right ─────────────────────────────── */}
        <motion.div {...slide(0.15)}>
          {/* Skill groups */}
          {SKILLS.map((g) => (
            <div
              key={g.area}
              style={{
                borderTop: "1px solid #1E1E1E",
                padding:   "26px 0",
              }}
            >
              <p style={{
                fontFamily:    "'Space Grotesk', sans-serif",
                fontSize:      "0.58rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color:         "#444444",
                marginBottom:  "12px",
                fontWeight:    500,
              }}>
                {g.area}
              </p>
              <p style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize:   "0.88rem",
                color:      "#666666",
                fontWeight: 300,
              }}>
                {g.items.join("  ·  ")}
              </p>
            </div>
          ))}

          {/* Stats grid */}
          <div style={{
            borderTop:           "1px solid #1E1E1E",
            paddingTop:          "28px",
            display:             "grid",
            gridTemplateColumns: "1fr 1fr",
            gap:                 "20px",
            marginTop:           "4px",
          }}>
            {STATS.map((s) => (
              <div key={s.label}>
                <div style={{
                  fontFamily:    "'Space Grotesk', sans-serif",
                  fontWeight:    700,
                  fontSize:      "clamp(32px, 4vw, 52px)",
                  letterSpacing: "-0.04em",
                  color:         "#FF2D00",
                  lineHeight:    1,
                  marginBottom:  "6px",
                }}>
                  {s.num}
                </div>
                <div style={{
                  fontFamily:    "'Space Grotesk', sans-serif",
                  fontSize:      "0.58rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color:         "#444444",
                }}>
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
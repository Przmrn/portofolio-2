"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const PROJECTS = [
  {
    id:       "01",
    title:    "Smart Traffic System",
    sub:      "YOLOv8 & Computer Vision",
    desc:     "Real-time vehicle detection and congestion prediction pipeline running on live CCTV streams. Processes HD video to extract density maps and flag critical junctions.",
    tags:     ["Python", "YOLOv8", "OpenCV", "FastAPI"],
    year:     "2024",
  },
  {
    id:       "02",
    title:    "Mail Management Portal",
    sub:      "OCR & Web Development",
    desc:     "Automated mail intake system with OCR-powered data extraction, status tracking, and a full audit trail. Replaced entirely manual logging.",
    tags:     ["Laravel", "PHP", "MySQL", "Tesseract"],
    year:     "2024",
  },
  {
    id:       "03",
    title:    "Algorithm Minigame Arcade",
    sub:      "React & Logic",
    desc:     "Browser-based games that visualise sorting and pathfinding algorithms in real time. Built as an interactive learning tool for CS fundamentals.",
    tags:     ["React", "Framer Motion", "TypeScript"],
    year:     "2025",
  },
];

function Row({ p, index }) {
  const ref      = useRef(null);
  const inView   = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      className="project-row"
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display:             "grid",
        gridTemplateColumns: "72px 1fr 80px",
        gap:                 "28px",
        alignItems:          "start",
        borderBottom:        "1px solid #CCCCCA",
        padding:             "44px 0",
        transition:          "padding-left 0.3s ease",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = "14px")}
      onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = "0")}
    >
      {/* Number */}
      <span style={{
        fontFamily:    "'Space Grotesk', sans-serif",
        fontSize:      "0.68rem",
        fontWeight:    500,
        letterSpacing: "0.1em",
        color:         "#FF2D00",
        paddingTop:    "8px",
      }}>
        {p.id}
      </span>

      {/* Content */}
      <div>
        <h3 style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontWeight:    700,
          fontSize:      "clamp(26px, 3.8vw, 56px)",
          letterSpacing: "-0.035em",
          lineHeight:    1,
          color:         "#111111",
          marginBottom:  "10px",
        }}>
          {p.title}
        </h3>

        <p style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      "0.7rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          color:         "#888888",
          marginBottom:  "14px",
        }}>
          {p.sub}
        </p>

        <p style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize:   "0.9rem",
          color:      "#555555",
          lineHeight: 1.7,
          maxWidth:   "540px",
          fontWeight: 300,
        }}>
          {p.desc}
        </p>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "18px" }}>
          {p.tags.map((t) => (
            <span
              key={t}
              style={{
                fontFamily:    "'Space Grotesk', sans-serif",
                fontSize:      "0.58rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color:         "#111111",
                border:        "1px solid #CCCCCA",
                padding:       "4px 10px",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Year */}
      <div
        className="project-meta"
        style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      "0.62rem",
          letterSpacing: "0.1em",
          color:         "#AAAAAA",
          textAlign:     "right",
          paddingTop:    "8px",
        }}
      >
        {p.year}<br /><br />
        <span style={{ fontSize: "1rem", color: "#CCCCCA" }}>→</span>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const headRef = useRef(null);
  const headIn  = useInView(headRef, { once: true, margin: "-80px" });

  return (
    <section
      id="projects"
      style={{
        background:  "#E8E8E5",
        padding:     "100px 5vw 120px",
        borderTop:   "1px solid #CCCCCA",
      }}
    >
      {/* Header */}
      <motion.div
        ref={headRef}
        initial={{ opacity: 0, y: 24 }}
        animate={headIn ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          display:        "flex",
          justifyContent: "space-between",
          alignItems:     "flex-end",
          marginBottom:   "72px",
        }}
      >
        <span style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      "0.62rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color:         "#888888",
        }}>
          Selected Work
        </span>
        <span style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      "0.62rem",
          letterSpacing: "0.1em",
          color:         "#BBBBBB",
        }}>
          {PROJECTS.length} Projects
        </span>
      </motion.div>

      {/* Rows */}
      {PROJECTS.map((p, i) => (
        <Row key={p.id} p={p} index={i} />
      ))}
    </section>
  );
}
"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

const PROJECTS = [
  {
    id: "01",
    title: "Smart Traffic System",
    subtitle: "YOLOv8 & Computer Vision",
    year: "2025",
    category: "Computer Vision & Real-time AI",
    description:
      "Real-time vehicle detection and congestion prediction pipeline running on live CCTV streams. Processes HD video to extract density maps and flag critical junctions.",
    tags: ["Python", "YOLOv8", "OpenCV", "FastAPI", "Laravel"],
    image: "/project-traffic.png",
  },
  {
    id: "02",
    title: "Mail Management System",
    subtitle: "OCR & Web Development",
    year: "2025",
    category: "Web Development & Document Processing",
    description:
      "Automated mail intake with OCR-powered data extraction, status tracking, and a full audit trail. Replaced entirely manual logging — cutting entry time by over 80%.",
    tags: ["Laravel", "PHP", "MySQL", "PaddleOCR", "Python"],
    image: "/project-mail.png",
  },
  {
    id: "03",
    title: "Algorithm Minigame Arcade",
    subtitle: "React & Logic",
    year: "2026",
    category: "Interactive Web App & EdTech",
    description:
      "Browser-based games that visualise sorting and pathfinding algorithms in real time — an interactive learning tool for CS fundamentals, animated at smooth 60fps.",
    tags: ["React", "Framer Motion", "TypeScript"],
    image: "/project-arcade.png",
  },
  {
    id: "04",
    title: "Terminal AI Agent",
    subtitle: "Node.js & LLM Integration",
    year: "2026",
    category: "AI Systems & CLI Automation",
    description:
      "Interactive CLI AI agent built from scratch in pure Node.js — LLM streaming, session history, and terminal workflow automation with zero heavy frameworks.",
    tags: ["Node.js", "LLM API", "JavaScript", "CLI"],
    image: "/project-agent.png",
  },
];

/* Single-column project list — each entry owns the full 1078px width.
   Transparent rows, sharp 0px images, title below in 16–18px.
   No card chrome, no shadow, 46px rhythm between rows. */
export default function WorkList() {
  return (
    <section id="work" className="band band--paper" style={{ paddingTop: 0 }}>
      <div className="monopo-container">
        <Reveal>
          <p className="eyebrow">Selected work — {PROJECTS.length} systems</p>
          <h2 className="text-heading-sm" style={{ marginBottom: 8 }}>
            Work
          </h2>
          <p className="text-body-sm" style={{ color: "var(--color-felt-gray)", maxWidth: "56ch" }}>
            Four production-minded builds across vision, web platforms, and
            AI tooling. Each image is the content — no frames, no chrome.
          </p>
        </Reveal>

        <div style={{ marginTop: 48 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id}>
              <article className="work-row">
                <p className="work-row__index">
                  {p.id} — {p.year} · {p.category}
                </p>
                <WorkMedia project={projectWithFallback(p)} priority={i === 0} />
                <h3 className="work-row__title">{p.title}</h3>
                <div className="work-row__meta">
                  <span className="text-body-sm" style={{ color: "var(--color-felt-gray)" }}>
                    {p.subtitle}
                  </span>
                </div>
                <p className="text-body-sm work-row__desc">{p.description}</p>
                <div className="work-row__tags">
                  {p.tags.map((t) => (
                    <span key={t} className="tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function projectWithFallback(p) {
  return p;
}

function WorkMedia({ project, priority }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  /* Gentle drift inside the frame — the image breathes while the
     row glides past. Wrapper is scaled so edges never show. */
  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
  const driftStyle = reduce ? undefined : { y, scale: 1.15 };

  const known = ["/project-traffic.png", "/project-mail.png", "/project-arcade.png"];
  const hasImage = known.includes(project.image);

  if (!hasImage) {
    return (
      <div className="work-row__media" ref={ref} aria-label={`${project.title} — typographic placeholder`}>
        <div className="work-row__fallback">
          <span className="text-anchor" style={{ fontSize: "clamp(56px, 10vw, 110px)" }}>
            {project.id}
          </span>
          <span className="text-micro" style={{ opacity: 0.7 }}>
            {project.subtitle}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="work-row__media" ref={ref}>
      <motion.div style={driftStyle} className="work-row__drift">
        <Image
          src={project.image}
          alt={`${project.title} — ${project.subtitle}`}
          width={1600}
          height={900}
          sizes="(max-width: 1100px) 100vw, 1078px"
          priority={priority}
        />
      </motion.div>
    </div>
  );
}

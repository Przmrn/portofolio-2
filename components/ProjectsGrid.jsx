"use client";
import ProjectCard from "./ProjectCard";

const PROJECTS = [
  {
    id:    "01",
    title: "Smart Traffic System",
    sub:   "YOLOv8 & Computer Vision",
    desc:  "Real-time vehicle detection and congestion prediction pipeline running on live CCTV streams. Processes HD video to extract density maps and flag critical junctions.",
    tags:  ["PYTHON", "YOLOV8", "OPENCV", "FASTAPI", "LARAVEL"],
    year:  "2025",
    image: "/project-traffic.png",
  },
  {
    id:    "02",
    title: "Mail Management System",
    sub:   "OCR & Web Development",
    desc:  "Automated mail intake system with OCR-powered data extraction, status tracking, and a full audit trail. Replaced entirely manual logging.",
    tags:  ["LARAVEL", "PHP", "MYSQL", "PADDLEOCR", "PYTHON"],
    year:  "2025",
    image: "/project-mail.png",
  },
  {
    id:    "03",
    title: "Algorithm Minigame Arcade",
    sub:   "React & Logic",
    desc:  "Browser-based games that visualise sorting and pathfinding algorithms in real time. Built as an interactive learning tool for CS fundamentals.",
    tags:  ["REACT", "FRAMER MOTION", "TYPESCRIPT"],
    year:  "2026",
    image: "/project-arcade.png",
  },
];

export default function ProjectsGrid() {
  return (
    <section
      id="projects"
      style={{
        background: "#ffffff",
        padding: "88px 5vw 60px",
        height: "100%",
      }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: "64px" }}>
        <p className="label-mono--xs" style={{ color: "#c8c8c8", marginBottom: "16px" }}>
          [{PROJECTS.length} PROJECTS]
        </p>
        <h2 className="display-heading" style={{ color: "#080707" }}>
          FEATURED WORK
        </h2>
      </div>

      {/* 2-column grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 420px), 1fr))",
          gap: "48px 40px",
        }}
      >
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

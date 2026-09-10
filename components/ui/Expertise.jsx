"use client";

import Reveal from "./Reveal";

const SKILLS = [
  { area: "Web Development", items: ["Laravel", "PHP", "React", "Next.js", "MySQL", "Tailwind", "REST APIs"] },
  { area: "Data & Vision", items: ["Python", "YOLOv8", "OpenCV", "TensorFlow", "Pandas", "FastAPI", "PaddleOCR"] },
  { area: "Design & Tooling", items: ["Figma", "Git", "Linux"] },
];

const STATS = [
  { value: "2+", label: "Years experience" },
  { value: "4", label: "Major systems shipped" },
  { value: "3", label: "Domains covered" },
  { value: "∞", label: "Curiosity" },
];

/* Dark inverse band — anchor-weight statement (94px / lh 0.76) in white,
   skill rows and stats below. The text itself is the visual. */
export default function Expertise() {
  return (
    <section id="stack" className="band band--obsidian on-dark">
      <div className="monopo-container">
        <Reveal>
          <p className="eyebrow">Capabilities</p>
          <h2 className="text-anchor" style={{ color: "#fff" }}>
            Systems,
            <br />
            end to end
          </h2>
        </Reveal>

        <div className="split" style={{ marginTop: 64 }}>
          <Reveal>
            <p className="text-raleway-accent" style={{ color: "rgba(255,255,255,0.92)", maxWidth: "18ch" }}>
              From pixels on a CCTV feed to rows in a database.
            </p>
            <p className="text-body-sm" style={{ color: "var(--color-ash-mist)", marginTop: 20, maxWidth: "44ch" }}>
              Front-end interfaces, back-end APIs, model pipelines, and the
              deployment glue between them. Swiss-modernist restraint on the
              surface; production discipline underneath.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, marginTop: 40 }}>
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="stat-num" style={{ color: "#fff" }}>
                    {s.value}
                  </div>
                  <div className="text-micro" style={{ color: "var(--color-ash-mist)", marginTop: 8 }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <div>
            {SKILLS.map((g, gi) => (
              <Reveal key={g.area} delay={gi * 90}>
                <div className="skill-row">
                  <p className="text-micro" style={{ color: "var(--color-ash-mist)", marginBottom: 14 }}>
                    {g.area}
                  </p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {g.items.map((item) => (
                      <span key={item} className="tag-pill">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal delay={200}>
              <div style={{ marginTop: 32 }}>
                <a className="btn-ghost btn-ghost--dark" href="#contact">
                  Start a project
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

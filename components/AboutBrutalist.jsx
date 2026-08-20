"use client";

const SKILLS = [
  { area: "WEB DEVELOPMENT", items: ["LARAVEL", "PHP", "REACT", "NEXT.JS", "MYSQL"] },
  { area: "DATA & VISION",   items: ["PYTHON", "YOLOV8", "OPENCV", "TENSORFLOW", "PANDAS"] },
  { area: "DESIGN & TOOLING", items: ["FIGMA", "TAILWIND", "GIT", "LINUX", "REST APIS"] },
];

const STATS = [
  { num: "2+",  label: "Years Exp." },
  { num: "4",   label: "Projects" },
  { num: "3",   label: "Domains" },
  { num: "∞",   label: "Curiosity" },
];

export default function AboutBrutalist() {
  return (
    <section
      id="about"

      style={{
        background: "#ffffff",
        padding: "88px 5vw 60px",
        height: "100%",
        borderTop: "1px solid #c8c8c8",
      }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: "64px" }}>
        <p className="label-mono--xs" style={{ color: "#c8c8c8", marginBottom: "16px" }}>
          [ABOUT]
        </p>
        <h2 className="display-heading" style={{ color: "#080707" }}>
          BUILDING SYSTEMS<br />THAT WORK<span style={{ color: "#ebff00" }}>.</span>
        </h2>
      </div>

      {/* Two-column layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "80px",
          alignItems: "start",
        }}
      >
        {/* Left — Bio */}
        <div>
          <p className="body-text" style={{ color: "#383838", marginBottom: "20px", maxWidth: "420px" }}>
              Building full-stack web applications from front-end interfaces to back-end APIs.
          </p>
          <p className="body-text" style={{ color: "#383838", maxWidth: "420px" }}>
              Focused on building solid web applications, clear system architecture, and reliable APIs.
          </p>
        </div>

        {/* Right — Skills + Stats */}
        <div>
          {/* Skill groups */}
          {SKILLS.map((g) => (
            <div
              key={g.area}
              style={{
                borderTop: "1px solid #c8c8c8",
                padding: "20px 0",
              }}
            >
              <p className="label-mono--xs" style={{ color: "#c8c8c8", marginBottom: "10px" }}>
                [{g.area}]
              </p>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {g.items.map((item) => (
                  <span key={item} className="tag-bracket">
                    [{item}]
                  </span>
                ))}
              </div>
            </div>
          ))}

          {/* Stats */}
          <div
            style={{
              borderTop: "1px solid #c8c8c8",
              paddingTop: "24px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "4px",
            }}
          >
            {STATS.map((s) => (
              <div key={s.label}>
                <div
                  className="display-heading"
                  style={{
                    fontSize: "clamp(32px, 4vw, 48px)",
                    color: "#080707",
                    lineHeight: 1,
                    marginBottom: "6px",
                  }}
                >
                  {s.num}
                </div>
                <div className="label-mono--xs" style={{ color: "#c8c8c8" }}>
                  [{s.label.toUpperCase()}]
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

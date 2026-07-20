"use client";
import Image from "next/image";

export default function ProjectCard({ project, index }) {
  return (
    <article style={{ marginBottom: "48px" }}>
      {/* Header row: project name + year */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "10px",
        }}
      >
        <span className="label-mono--sm" style={{ color: "#080707" }}>
          {project.title}
        </span>
        <span className="label-mono--sm" style={{ color: "#c8c8c8" }}>
          {project.year}
        </span>
      </div>

      {/* Image container */}
      <div
        style={{
          width: "100%",
          aspectRatio: "16 / 10",
          borderRadius: "24px",
          border: "1px solid #000000",
          overflow: "hidden",
          background: "#c8c8c8",
          position: "relative",
        }}
      >
        {project.image ? (
          <Image
            src={project.image}
            alt={project.title}
            fill
            style={{ objectFit: "cover" }}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          /* Fog placeholder with project info */
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
            }}
          >
            <span
              className="display-heading--sm"
              style={{ color: "#383838", opacity: 0.4, textAlign: "center", padding: "0 20px" }}
            >
              {project.title}
            </span>
            <span className="label-mono--xs" style={{ color: "#383838", opacity: 0.3 }}>
              [{project.sub}]
            </span>
          </div>
        )}
      </div>

      {/* Metadata tags */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginTop: "12px",
        }}
      >
        {project.tags.map((tag) => (
          <span key={tag} className="tag-bracket">
            [{tag}]
          </span>
        ))}
      </div>

      {/* Description */}
      <p
        className="body-text"
        style={{
          color: "#383838",
          marginTop: "10px",
          maxWidth: "520px",
        }}
      >
        {project.desc}
      </p>
    </article>
  );
}

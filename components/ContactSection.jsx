"use client";
import { useState } from "react";

const SOCIALS = [
  { label: "GITHUB",   href: "https://github.com" },
  { label: "LINKEDIN", href: "https://linkedin.com" },
];

export default function ContactSection() {

  const [copied, setCopied] = useState(false);

  const email = "amarnfl238@gmail.com";

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback — do nothing */
    }
  };



  return (
    <section
      id="contact"

      style={{
        background: "#080707",
        color: "#ffffff",
        padding: "88px 5vw 40px",
        height: "100%",
      }}
    >
      {/* Section heading */}
      <div style={{ marginBottom: "64px" }}>
        <p className="label-mono--xs" style={{ color: "#383838", marginBottom: "16px" }}>
          [CONTACT]
        </p>
        <h2 className="display-heading" style={{ color: "#ffffff" }}>
          REACH OUT<span style={{ color: "#ebff00" }}>.</span>
        </h2>
      </div>

      {/* Contact rows */}
      <div>
        {/* Row 1 — Email */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #383838",
            padding: "28px 0",
          }}
        >
          <span className="label-mono" style={{ color: "#ffffff" }}>
            EMAIL
          </span>
          <button
            onClick={copyEmail}
            className="btn-outlined"
            style={{ color: "#ffffff", borderColor: "#ffffff" }}
          >
            {copied ? "COPIED ✓" : email.toUpperCase()}
            {!copied && (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
              </svg>
            )}
          </button>
        </div>

        {/* Row 2 — Video Call */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #383838",
            padding: "28px 0",
          }}
        >
          <span className="label-mono" style={{ color: "#ffffff" }}>
            VIDEO CALL
          </span>
          <a href={`mailto:${email}?subject=Let's%20Talk`} className="pill-lime" style={{ textDecoration: "none" }}>
            BOOK A CALL ↗
          </a>
        </div>

        {/* Row 3 — Connect */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: "1px solid #383838",
            borderBottom: "1px solid #383838",
            padding: "28px 0",
          }}
        >
          <span className="label-mono" style={{ color: "#ffffff" }}>
            CONNECT
          </span>
          <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="label-mono"
                style={{
                  color: "#ffffff",
                  transition: "opacity 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                {s.label} ↗
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: "80px",
          paddingTop: "24px",
          borderTop: "1px solid #383838",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "12px",
        }}
      >
        <span className="label-mono--xs" style={{ color: "#383838" }}>
          © 2026 AMMAR — ALL RIGHTS RESERVED
        </span>
        <span
          className="label-mono--xs"
          style={{
            color: "#383838",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#ebff00",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
            }}
          />
          AVAILABLE FOR WORK
        </span>
      </div>
    </section>
  );
}

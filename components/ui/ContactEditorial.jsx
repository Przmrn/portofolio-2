"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const EMAIL = "amarnfl238@gmail.com";

/* Contact — quiet editorial flow, left-aligned. One ghost pill per action,
   hairline dividers, no filled marketing CTA. */
export default function ContactEditorial() {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — mailto remains */
    }
  };

  return (
    <section id="contact" className="band band--paper">
      <div className="monopo-container">
        <Reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="text-whisper" style={{ maxWidth: "14ch" }}>
            Let&apos;s build something that lasts.
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginTop: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", borderTop: "1px solid rgba(0,0,0,0.14)", padding: "28px 0" }}>
              <span className="text-micro" style={{ color: "var(--color-felt-gray)" }}>
                Email
              </span>
              <a className="text-subheading" href={`mailto:${EMAIL}?subject=Let%27s%20talk`} style={{ overflowWrap: "anywhere" }}>
                {EMAIL}
              </a>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", borderTop: "1px solid rgba(0,0,0,0.14)", padding: "28px 0" }}>
              <span className="text-micro" style={{ color: "var(--color-felt-gray)" }}>
                Response
              </span>
              <span className="text-body-sm" style={{ color: "#2b2b2b" }}>
                Within 48 hours — freelance &amp; collaborations open
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 20, flexWrap: "wrap", borderTop: "1px solid rgba(0,0,0,0.14)", borderBottom: "1px solid rgba(0,0,0,0.14)", padding: "28px 0" }}>
              <span className="text-micro" style={{ color: "var(--color-felt-gray)" }}>
                Elsewhere
              </span>
              <span style={{ display: "flex", gap: 28 }}>
                <a className="link-quiet" href="https://github.com" target="_blank" rel="noopener noreferrer">
                  GitHub ↗
                </a>
                <a className="link-quiet" href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                  LinkedIn ↗
                </a>
              </span>
            </div>
          </div>
        </Reveal>

        <Reveal delay={160}>
          <div style={{ display: "flex", gap: 12, marginTop: 32, flexWrap: "wrap" }}>
            <a className="btn-ghost" href={`mailto:${EMAIL}?subject=Let%27s%20talk`}>
              Write an email
            </a>
            <button className="btn-ghost" onClick={copy} aria-live="polite">
              {copied ? "Copied" : "Copy address"}
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

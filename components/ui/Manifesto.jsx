"use client";

import Reveal from "./Reveal";

/* Manifesto — whisper-weight atmospheric headline (78px / weight 300).
   Spoken, not shouted. Asymmetric: statement left, annotation right. */
export default function Manifesto() {
  return (
    <section id="manifesto" className="band band--paper">
      <div className="monopo-container">
        <Reveal>
          <p className="eyebrow">Manifesto</p>
        </Reveal>
        <div className="split">
          <Reveal>
            <h2 className="text-whisper" style={{ maxWidth: "16ch" }}>
              Building systems that work. Code that ships — not just demos.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <div style={{ paddingTop: 12 }}>
              <p className="text-body" style={{ color: "#2b2b2b", maxWidth: "42ch" }}>
                I work at the convergence of computer vision, full-stack web
                engineering, and production systems — from live CCTV pipelines
                to OCR document flows and interactive learning tools.
              </p>
              <p className="text-body-sm" style={{ color: "var(--color-felt-gray)", marginTop: 16, maxWidth: "42ch" }}>
                Every system prioritises reliability, data integrity, seamless
                API integration, and an interface that stays out of the way.
              </p>
              <div style={{ display: "flex", gap: 12, marginTop: 28, flexWrap: "wrap" }}>
                <a className="btn-ghost" href="#work">
                  View work
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

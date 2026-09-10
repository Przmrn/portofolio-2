"use client";

import { scrollToId } from "./scroll";

/* Footer — compact address block on obsidian. 11px felt-gray copy,
   no dividers or labels; the muted gray does the work. */
export default function Footer() {
  const go = (id) => scrollToId(id);

  return (
    <footer className="on-dark" style={{ background: "var(--color-obsidian)", color: "#fff", padding: "64px 0 32px" }}>
      <div className="monopo-container">
        <div className="footer-grid">
          <div>
            <p style={{ fontSize: 16, fontWeight: 400 }}>ammar</p>
            <div className="address" style={{ marginTop: 16 }}>
              <p>Full-stack developer,</p>
              <p>computer vision engineer.</p>
              <p style={{ marginTop: 8 }}>Code that ships — not just demos.</p>
            </div>
          </div>
          <div className="address">
            <p style={{ color: "#fff", marginBottom: 12 }}>Banda Aceh</p>
            <p>5.5501° N, 95.3222° E</p>
            <p>Indonesia</p>
            <p>Base of operations</p>
          </div>
          <div className="address">
            <p style={{ color: "#fff", marginBottom: 12 }}>Elsewhere</p>
            <p>
              <a className="link-quiet link-quiet--micro" style={{ color: "#8f8f8f" }} href="https://github.com" target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
            </p>
            <p style={{ marginTop: 8 }}>
              <a className="link-quiet link-quiet--micro" style={{ color: "#8f8f8f" }} href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                LinkedIn ↗
              </a>
            </p>
            <p style={{ marginTop: 8 }}>
              <a className="link-quiet link-quiet--micro" style={{ color: "#8f8f8f" }} href="mailto:amarnfl238@gmail.com">
                Email ↗
              </a>
            </p>
          </div>
          <div className="address">
            <p style={{ color: "#fff", marginBottom: 12 }}>Index</p>
            {[
              ["Work", "work"],
              ["Manifesto", "manifesto"],
              ["Stack", "stack"],
              ["Contact", "contact"],
            ].map(([label, id]) => (
              <p key={id} style={{ marginTop: 8 }}>
                <button className="link-quiet link-quiet--micro" style={{ color: "#8f8f8f" }} onClick={() => go(id)}>
                  {label}
                </button>
              </p>
            ))}
          </div>
        </div>

        <div
          style={{
            marginTop: 56,
            paddingTop: 20,
            borderTop: "1px solid rgba(255,255,255,0.14)",
            display: "flex",
            justifyContent: "space-between",
            gap: 12,
            flexWrap: "wrap",
          }}
        >
          <span className="text-micro" style={{ color: "#8f8f8f" }}>
            © 2026 Ammar — All rights reserved
          </span>
          <span className="text-micro" style={{ color: "#8f8f8f" }}>
            Set in Inter &amp; Raleway — after Roobert
          </span>
        </div>
      </div>
    </footer>
  );
}

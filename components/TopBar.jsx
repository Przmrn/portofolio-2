"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TimeBadge from "./TimeBadge";

const NAV_LINKS = [
  { label: "WORK",      href: "#projects",  icon: "⊙" },
  { label: "ABOUT",     href: "#about",     icon: null },
  { label: "REACH OUT", href: "#contact",   icon: null },
];

export default function TopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "20px 5vw",
        background: scrolled ? "rgba(255,255,255,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(8px)" : "none",
        transition: "background 0.3s, backdrop-filter 0.3s",
      }}
    >
      {/* Left — Brand */}
      <a href="#" className="label-mono--brand" style={{ color: "#080707" }}>
        [AMMAR]
      </a>

      {/* Center — Nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {NAV_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="label-mono"
            style={{
              color: "#080707",
              transition: "opacity 0.2s",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
            {link.icon && <span style={{ marginLeft: "4px" }}>{link.icon}</span>}
          </a>
        ))}
      </nav>

      {/* Right — Time Badge */}
      <TimeBadge />
    </motion.header>
  );
}

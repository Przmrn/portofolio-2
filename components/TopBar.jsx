"use client";
import { motion } from "framer-motion";
import TimeBadge from "./TimeBadge";
import { usePageContext } from "./FullPageScroll";

const NAV_LINKS = [
  { label: "WORK",      page: 1, icon: "⊙" },
  { label: "ABOUT",     page: 2, icon: null },
  { label: "REACH OUT", page: 3, icon: null },
];

export default function TopBar() {
  const { current, goTo } = usePageContext();

  // Adapt colors based on current slide tone
  const isDark = current === 3;
  const fg = isDark ? "#ffffff" : "#080707";
  const bg = current === 0
    ? "transparent"
    : isDark
      ? "rgba(8,7,7,0.92)"
      : "rgba(255,255,255,0.92)";
  const blur = current === 0 ? "none" : "blur(8px)";

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
        background: bg,
        backdropFilter: blur,
        transition: "background 0.4s ease, backdrop-filter 0.4s ease",
      }}
    >
      {/* Left — Brand */}
      <button
        onClick={() => goTo(0)}
        className="label-mono--brand"
        style={{
          color: fg,
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
          transition: "color 0.4s ease",
        }}
      >
        [AMMAR]
      </button>

      {/* Center — Nav */}
      <nav style={{ display: "flex", alignItems: "center", gap: "28px" }}>
        {NAV_LINKS.map((link) => (
          <button
            key={link.label}
            onClick={() => goTo(link.page)}
            className="label-mono"
            style={{
              color: fg,
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 0,
              transition: "opacity 0.2s, color 0.4s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.5")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            {link.label}
            {link.icon && <span style={{ marginLeft: "4px" }}>{link.icon}</span>}
          </button>
        ))}
      </nav>

      {/* Right — Time Badge */}
      <TimeBadge />
    </motion.header>
  );
}

"use client";
import { motion } from "framer-motion";

export default function BookCallCTA() {
  return (
    <motion.a
      href="mailto:amarnfl238@gmail.com?subject=Let's%20Talk"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: "fixed",
        bottom: "32px",
        right: "32px",
        zIndex: 90,
        display: "inline-flex",
        alignItems: "center",
        gap: "10px",
        background: "#ebff00",
        color: "#080707",
        borderRadius: "84px",
        padding: "10px 20px",
        fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
        fontSize: "11px",
        fontWeight: 600,
        letterSpacing: "0.086em",
        textTransform: "uppercase",
        textDecoration: "none",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        cursor: "pointer",
        whiteSpace: "nowrap",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Avatar placeholder */}
      <span
        style={{
          width: 24,
          height: 24,
          borderRadius: "50%",
          background: "#080707",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "10px",
          fontWeight: 700,
          color: "#ebff00",
          flexShrink: 0,
        }}
      >
        A
      </span>
      BOOK A CALL
      <span style={{ fontSize: "14px" }}>↗</span>
    </motion.a>
  );
}

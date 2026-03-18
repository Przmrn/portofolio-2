"use client";
import { motion } from "framer-motion";

const LINKS = [
  { label: "PROJECTS", href: "#projects" },
  { label: "ABOUT",    href: "#about"    },
  { label: "CONTACT",  href: "#contact"  },
];

export default function Nav() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1,  y: 0   }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position:     "fixed",
        top:          "24px",
        left:         "42%",
        transform:    "translateX(-50%)",
        zIndex:       100,
        display:      "flex",
        alignItems:   "center",
        gap:          "2px",
        background:   "#111111",
        borderRadius: "999px",
        padding:      "5px",
      }}
    >
      {LINKS.map((link) => (
        <a
          key={link.label}
          href={link.href}
          style={{
            fontFamily:     "'Space Grotesk', sans-serif",
            fontSize:       "0.62rem",
            fontWeight:     500,
            letterSpacing:  "0.14em",
            color:          "#888888",
            textDecoration: "none",
            padding:        "8px 20px",
            borderRadius:   "999px",
            whiteSpace:     "nowrap",
            transition:     "background 0.2s, color 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#FF2D00";
            e.currentTarget.style.color      = "#FFFFFF";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.color      = "#888888";
          }}
        >
          [ {link.label} ]
        </a>
      ))}
    </motion.nav>
  );
}
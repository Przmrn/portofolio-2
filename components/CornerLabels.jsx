"use client";
import { useEffect, useState } from "react";

const base = {
  fontFamily:    "'Space Grotesk', sans-serif",
  fontSize:      "0.6rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color:         "#888888",
  position:      "fixed",
  zIndex:        50,
  pointerEvents: "none",
  lineHeight:    1.6,
};

export default function CornerLabels() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const tick = () =>
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour:     "2-digit",
          minute:   "2-digit",
          hour12:   false,
          timeZone: "Asia/Jakarta",
        })
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {/* Top-left */}
      <div className="corner-label" style={{ ...base, top: 28, left: 28 }}>
        ammar@dev.id
      </div>

      {/* Top-right */}
      <div className="corner-label" style={{ ...base, top: 28, right: 28, textAlign: "right" }}>
        Banda Aceh / {time}
      </div>

      {/* Bottom-left */}
      <div className="corner-label" style={{ ...base, bottom: 28, left: 28 }}>
        Full-Stack Dev<br />CV Engineer
      </div>

      {/* Bottom-right */}
      <div className="corner-label" style={{ ...base, bottom: 28, right: 28, textAlign: "right" }}>
        © 2026 Ammar
      </div>
    </>
  );
}
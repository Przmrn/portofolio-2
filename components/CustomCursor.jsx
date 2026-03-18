"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const dotRef  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + "px";
        dotRef.current.style.top  = e.clientY + "px";
      }
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={dotRef}
      style={{
        position:      "fixed",
        top:           0,
        left:          0,
        zIndex:        9999,
        pointerEvents: "none",
        transform:     "translate(-50%, -50%)",
        fontSize:      "22px",
        fontWeight:    300,
        lineHeight:    1,
        color:         "#111111",
        fontFamily:    "monospace",
        userSelect:    "none",
        mixBlendMode:  "multiply",
      }}
    >
      +
    </div>
  );
}
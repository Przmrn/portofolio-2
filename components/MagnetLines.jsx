"use client";
import { useEffect, useRef } from "react";

export default function MagnetLines({
  rows        = 13,
  cols        = 20,
  cellSize    = 34,
  lineLength  = 20,
  lineColor   = "#111111",
  lineOpacity = 0.28,
  maxDist     = 220,
}) {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg   = svgRef.current;
    if (!svg) return;

    const total = rows * cols;

    // Pre-compute cell centers once
    const cx  = new Float32Array(total);
    const cy  = new Float32Array(total);
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        cx[i]   = (c + 0.5) * cellSize;
        cy[i]   = (r + 0.5) * cellSize;
      }
    }

    const angles = new Float32Array(total); // current angle (radians)
    const mouse  = { x: -9999, y: -9999 };
    const half   = lineLength / 2;

    const onMove = (e) => {
      const rect = svg.getBoundingClientRect();
      mouse.x    = e.clientX - rect.left;
      mouse.y    = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMove);

    const svgLines = svg.querySelectorAll("line");
    let   raf;

    const loop = () => {
      for (let i = 0; i < total; i++) {
        const dx   = mouse.x - cx[i];
        const dy   = mouse.y - cy[i];
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Target: point toward mouse if close, else return to 0
        const target = dist < maxDist ? Math.atan2(dy, dx) : 0;

        // Shortest-path interpolation to avoid spinning
        let diff = target - angles[i];
        while (diff >  Math.PI) diff -= Math.PI * 2;
        while (diff < -Math.PI) diff += Math.PI * 2;

        angles[i] += diff * (dist < maxDist ? 0.14 : 0.06);

        const cos  = Math.cos(angles[i]);
        const sin  = Math.sin(angles[i]);
        const line = svgLines[i];
        if (!line) continue;

        line.setAttribute("x1", cx[i] - cos * half);
        line.setAttribute("y1", cy[i] - sin * half);
        line.setAttribute("x2", cx[i] + cos * half);
        line.setAttribute("y2", cy[i] + sin * half);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [rows, cols, cellSize, lineLength, maxDist]);

  const W = cols * cellSize;
  const H = rows * cellSize;
  const half = lineLength / 2;

  return (
    <svg
      ref={svgRef}
      width={W}
      height={H}
      aria-hidden="true"
      style={{ display: "block", overflow: "visible" }}
    >
      {Array.from({ length: rows * cols }, (_, i) => {
        const r  = Math.floor(i / cols);
        const c  = i % cols;
        const x  = (c + 0.5) * cellSize;
        const y  = (r + 0.5) * cellSize;
        return (
          <line
            key={i}
            x1={x - half} y1={y}
            x2={x + half} y2={y}
            stroke={lineColor}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity={lineOpacity}
          />
        );
      })}
    </svg>
  );
}
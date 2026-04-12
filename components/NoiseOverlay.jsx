'use client';
import { useEffect, useRef } from 'react';

/**
 * NoiseOverlay — Performance-optimised film grain.
 * 
 * Instead of putImageData on a full-viewport canvas every frame (expensive),
 * we generate a tiny 150×150 noise tile ONCE and tile it with CSS.
 * A simple CSS animation shifts background-position to create flicker.
 * Cost: ~0ms per frame (GPU-composited, no JS in the loop).
 */
export default function NoiseOverlay() {
  const ref = useRef(null);

  useEffect(() => {
    // Generate a small noise tile once
    const size = 150;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const imgData = ctx.createImageData(size, size);
    const d = imgData.data;

    for (let i = 0; i < d.length; i += 4) {
      const v = Math.random() < 0.15 ? 0 : 255;
      d[i] = d[i + 1] = d[i + 2] = v;
      d[i + 3] = Math.random() < 0.15 ? 18 : 0; // very sparse, subtle
    }
    ctx.putImageData(imgData, 0, 0);

    if (ref.current) {
      ref.current.style.backgroundImage = `url(${canvas.toDataURL('image/png')})`;
    }
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        opacity: 0.5,
        mixBlendMode: 'multiply',
        backgroundRepeat: 'repeat',
        animation: 'grain-shift 0.4s steps(4) infinite',
        willChange: 'background-position',
      }}
    />
  );
}

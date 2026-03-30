'use client';
import { useEffect, useRef } from 'react';

export default function NoiseOverlay() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    
    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const buildNoise = () => {
      const imgData = ctx.createImageData(w, h);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;
      for (let i = 0; i < len; i++) {
        if (Math.random() < 0.2) {
          buffer32[i] = 0x0f000000; // very subtle black noise
        }
      }
      return imgData;
    };

    let noiseData = [];
    const frameCount = 10;
    
    for (let i = 0; i < frameCount; i++) {
      noiseData.push(buildNoise());
    }

    let frame = 0;
    let animationId;

    const render = () => {
      ctx.putImageData(noiseData[frame], 0, 0);
      frame = (frame + 1) % frameCount;
      // throttle to create that dirty 15fps film effect
      setTimeout(() => {
        animationId = requestAnimationFrame(render);
      }, 50);
    };

    render();

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w;
      canvas.height = h;
      noiseData = [];
      for (let i = 0; i < frameCount; i++) {
        noiseData.push(buildNoise());
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 50,
        pointerEvents: 'none',
        opacity: 0.6,
        mixBlendMode: 'multiply'
      }}
    />
  );
}

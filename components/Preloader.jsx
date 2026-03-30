'use client';
import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function Preloader({ onComplete }) {
  const wrapRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const c = { v: 0 };
    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(wrapRef.current, {
          yPercent: -100, duration: 0.8, ease: 'power3.inOut',
          onComplete: () => onComplete?.(),
        });
      },
    });
    tl.to(c, {
      v: 100, duration: 2.4, ease: 'power2.inOut',
      onUpdate: () => setCount(Math.round(c.v)),
    });
    return () => tl.kill();
  }, [onComplete]);

  return (
    <div ref={wrapRef} style={{
      position:'fixed',inset:0,zIndex:9999,background:'#000',
      display:'flex',alignItems:'center',justifyContent:'center',
    }}>
      <span style={{
        fontFamily:"'Inter',sans-serif",fontSize:'clamp(72px,18vw,260px)',
        fontWeight:900,color:'#FFF',letterSpacing:'-0.04em',lineHeight:1,
      }}>
        {String(count).padStart(3,'0')}
      </span>
    </div>
  );
}
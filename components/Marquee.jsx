'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Marquee({ text, direction = 1, bg = "bg-white", fg = "text-black" }) {
  const container = useRef(null);
  
  useGSAP(() => {
    // Infinite horizontal scroll
    gsap.to('.marquee-track', {
      xPercent: -50 * direction,
      ease: 'none',
      repeat: -1,
      duration: 15
    });
  }, { scope: container });

  // Creating two duplicates string chunks for smooth repeating
  const chunk = Array.from({ length: 4 }).map((_, i) => (
    <span key={i} className="px-8 whitespace-nowrap">
      {text}
      <span className="inline-block ml-8 text-red-600 scale-150 align-middle">•</span>
    </span>
  ));

  return (
    <div ref={container} className={`relative w-full overflow-hidden flex items-center py-8 lg:py-12 ${bg} ${fg}`}>
      <div className="marquee-track flex font-sans font-black uppercase text-5xl sm:text-7xl tracking-[-0.05em] leading-none w-max" style={{ transform: direction === -1 ? 'translateX(-50%)' : 'none' }}>
        {chunk}
      </div>
    </div>
  );
}

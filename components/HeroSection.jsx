'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function HeroSection() {
  const container = useRef(null);
  
  useGSAP(() => {
    // Elegant fade and slide-up for text elements
    gsap.from('.hero-text-reveal', {
      y: 100,
      opacity: 0,
      duration: 1.2,
      stagger: 0.1,
      ease: 'power4.out',
      delay: 0.2
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full min-h-screen flex flex-col justify-between pt-8 pb-12 px-6 lg:px-16" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Top Nav alignment */}
      <header className="flex justify-between items-start w-full">
        <div className="overflow-hidden">
          <h2 className="hero-text-reveal text-sm tracking-tighter font-medium uppercase font-sans">
            Ammar.
          </h2>
        </div>
        <div className="flex gap-12 text-sm font-mono uppercase text-gray-500 tracking-widest">
          <div className="overflow-hidden"><a href="#works" className="hero-text-reveal block hover:text-black transition-colors">Works</a></div>
          <div className="overflow-hidden"><a href="#about" className="hero-text-reveal block hover:text-black transition-colors">Info</a></div>
          <div className="overflow-hidden"><a href="#contact" className="hero-text-reveal block hover:text-black transition-colors">Contact</a></div>
        </div>
      </header>

      {/* Center Layout split */}
      <div className="w-full flex flex-col lg:flex-row items-end justify-between gap-12 lg:gap-24 mb-16">
        
        {/* Massive Name left side with tight tracking */}
        <div className="flex-1">
          <div className="overflow-hidden">
            <h1 className="hero-text-reveal text-[18vw] leading-[0.85] font-black uppercase tracking-[-0.05em] text-black">
              AMMAR
            </h1>
          </div>
        </div>

        {/* Roles / Intro right side */}
        <div className="flex-1 max-w-sm ml-auto pb-4">
          <div className="overflow-hidden mb-8">
            <p className="hero-text-reveal text-lg font-medium leading-relaxed tracking-tight text-gray-900">
              Full-Stack Developer & Computer Vision Engineer — building systems that matter with clean code and quiet precision.
            </p>
          </div>
          
          <div className="overflow-hidden flex gap-4 items-center">
             <div className="status-dot hero-text-reveal"></div>
             <p className="hero-text-reveal font-mono text-xs tracking-widest uppercase text-gray-500">
               Available for Freelance
             </p>
          </div>
        </div>
        
      </div>
    </section>
  );
}

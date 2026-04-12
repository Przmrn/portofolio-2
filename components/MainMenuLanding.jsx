'use client';
import { useRef, useState } from 'react';
import Script from 'next/script';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const menuLinks = [
  { label: 'ABOUT AMMAR', panel: 'about' },
  { label: 'SELECTED WORKS', panel: 'works' },
  { label: 'THE JOURNAL', panel: null },
  { label: 'CONTACT', panel: 'contact' },
];

export default function MainMenuLanding({ onNavigate, activePanel }) {
  const container = useRef(null);
  const splineRef = useRef(null);
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const [sceneLoaded, setSceneLoaded] = useState(false);

  // GSAP ENTRANCE & HOVER LOGIC
  useGSAP(() => {
    if (!sceneLoaded) return;
    
    const tl = gsap.timeline();
    
    // 1. Spline fade in
    tl.to(splineRef.current, { opacity: 1, duration: 1.5, ease: 'power2.out' }, 0);
    
    // 2. UI Stagger up
    tl.from('.mm-reveal', {
      y: 60,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: 'power4.out',
    }, 0.5);

  }, { scope: container, dependencies: [sceneLoaded] });

  // 3D Depth interaction on Hover
  const handleMouseEnter = (idx) => {
    setHoveredIdx(idx);
    if (splineRef.current) {
       gsap.to(splineRef.current, { scale: 1.05, duration: 0.8, ease: 'power3.out' });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIdx(null);
    if (splineRef.current) {
       gsap.to(splineRef.current, { scale: 1, duration: 0.8, ease: 'power3.out' });
    }
  };

  const handleClick = (link) => {
    if (link.panel && onNavigate) {
      onNavigate(link.panel);
    }
  };

  return (
    <section
      ref={container}
      className="fixed inset-0 w-full h-screen overflow-hidden bg-black text-white selection:bg-red-600 selection:text-white flex flex-col justify-between"
      style={{ zIndex: activePanel ? 0 : 1 }}
    >
      
      {/* --- 1. THE 3D SPLINE BACKGROUND --- */}
      <div 
        ref={splineRef} 
        className="absolute inset-0 w-full h-full z-0 opacity-0 pointer-events-none" 
        style={{ transformOrigin: 'center center', willChange: 'transform, opacity' }}
      >
         <Script 
           type="module" 
           src="https://unpkg.com/@splinetool/viewer@1.1.9/build/spline-viewer.js" 
           onLoad={() => setSceneLoaded(true)}
           strategy="lazyOnload"
         />
         <spline-viewer loading="lazy" url="https://prod.spline.design/dpN-y54o3VXYb1T1/scene.splinecode"></spline-viewer>
      </div>

      {/* --- 2. THE UI OVERLAY --- */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between pt-8 pb-12 px-6 lg:px-16 pointer-events-none">
         
         {/* Sub-Menu Top Header */}
         <header className="mm-reveal flex justify-between items-start w-full font-mono text-xs uppercase tracking-widest text-gray-300 pointer-events-auto">
            <span>AMMAR — IT DEVELOPER</span>
            <span className="text-gray-500">PORTFOLIO / 2025</span>
         </header>

         {/* Center Massive Menu */}
         <main className="w-full flex-1 flex flex-col justify-center items-center pointer-events-auto">
            <nav className="flex flex-col items-center gap-2 lg:gap-4" onMouseLeave={handleMouseLeave}>
               {menuLinks.map((link, i) => {
                 
                 const isActive = hoveredIdx === i;
                 const isInactive = hoveredIdx !== null && hoveredIdx !== i;
                 const isDisabled = !link.panel;
                 
                 return (
                   <button 
                     key={i}
                     onClick={() => handleClick(link)}
                     onMouseEnter={() => handleMouseEnter(i)}
                     disabled={isDisabled}
                     className="mm-reveal group relative text-center cursor-pointer disabled:cursor-default disabled:opacity-30 bg-transparent border-none"
                     style={{
                       transition: 'opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1), transform 0.5s cubic-bezier(0.19, 1, 0.22, 1)',
                       opacity: isInactive ? 0.15 : isDisabled ? 0.2 : 1,
                       transform: isActive ? 'scale(1.02)' : 'scale(1)',
                     }}
                   >
                     <h2 className="text-5xl md:text-7xl lg:text-[7vw] leading-[0.85] font-black uppercase tracking-[-0.06em] mix-blend-difference text-white">
                        {link.label}
                     </h2>
                     {isDisabled && (
                       <span className="absolute -right-4 top-0 font-mono text-[10px] uppercase tracking-widest text-gray-500 rotate-[-90deg] origin-right">
                         Soon
                       </span>
                     )}
                   </button>
                 );
               })}
            </nav>
         </main>

         {/* Bottom Tickertape */}
         <footer className="mm-reveal w-full overflow-hidden border-t-2 border-white/20 pt-4 pointer-events-auto">
            <div className="flex animate-[marquee_20s_linear_infinite] whitespace-nowrap opacity-50 text-xs font-mono uppercase tracking-widest space-x-12">
               <span>SMART TRAFFIC (YOLOV8)</span>
               <span className="text-red-500">//</span>
               <span>LARAVEL & PHP</span>
               <span className="text-red-500">//</span>
               <span>COMPUTER VISION</span>
               <span className="text-red-500">//</span>
               <span>REACT & NEXT.JS</span>
               <span className="text-red-500">//</span>
               <span>SMART TRAFFIC (YOLOV8)</span>
               <span className="text-red-500">//</span>
               <span>LARAVEL & PHP</span>
               <span className="text-red-500">//</span>
               <span>COMPUTER VISION</span>
               <span className="text-red-500">//</span>
               <span>REACT & NEXT.JS</span>
            </div>
         </footer>

      </div>

    </section>
  );
}

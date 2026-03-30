'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ManifestoSection() {
  const container = useRef(null);

  useGSAP(() => {
    // Parallax background
    gsap.to(container.current, {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: container.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });

    // Reveal text
    gsap.from('.manifesto-text', {
      y: 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 60%',
      }
    });
  }, { scope: container });

  return (
    <section ref={container} className="relative w-full bg-black text-white min-h-[80vh] flex flex-col items-center justify-center py-40 px-6 lg:px-16 z-10" style={{ transformOrigin: 'top center' }}>
      
      {/* 50/50 Editorial Alignment */}
      <div className="max-w-7xl w-full flex flex-col md:flex-row justify-between items-start gap-12 md:gap-32">
        <div className="flex-1">
           <h2 className="manifesto-text text-6xl lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.85]">
             BORN<br/>FROM<br/><span className="text-red-600">NOISE.</span>
           </h2>
        </div>
        
        <div className="flex-1 md:max-w-lg md:mt-[10vw]">
           <p className="manifesto-text text-xl lg:text-3xl font-medium tracking-tight leading-snug mb-8">
             I write clean code and build robust backend architecture because scaling systems require quiet precision, not loud ego.
           </p>
           <p className="manifesto-text font-mono text-sm tracking-widest text-gray-400 leading-relaxed">
             From computer vision models in smart traffic systems to high-concurrency ledger APIs, every component is engineered to perform invisibly. The less you notice the tools, the better they work.
           </p>
        </div>
      </div>
    </section>
  );
}

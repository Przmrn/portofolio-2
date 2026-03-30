'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.footer-reveal', {
      y: 100,
      opacity: 0,
      stagger: 0.1,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 80%',
      }
    });
  }, { scope: container });

  return (
    <footer id="contact" ref={container} className="w-full bg-white text-black py-24 px-6 lg:px-16 flex flex-col items-center justify-between border-t border-black/5 mt-auto">
      
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-end justify-between gap-16 mb-40 mt-16">
         <div className="flex-1 overflow-hidden">
            <h2 className="footer-reveal text-6xl lg:text-[10vw] font-black uppercase tracking-tighter leading-[0.85] mb-4">
              LET'S<br/>BUILD<br/>IT.
            </h2>
         </div>

         <div className="flex flex-col items-start gap-8 flex-1 md:max-w-md lg:mb-8 overflow-hidden">
            <a href="mailto:hello@ammar.dev" className="footer-reveal text-2xl lg:text-4xl font-bold uppercase tracking-tight hover:text-red-600 transition-colors">
              hello@ammar.dev
            </a>
            <div className="footer-reveal flex gap-6 text-sm font-mono tracking-widest uppercase text-gray-500">
               <a href="#" className="hover:text-black transition-colors">Github</a>
               <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
               <a href="#" className="hover:text-black transition-colors">Twitter X</a>
            </div>
         </div>
      </div>

      <div className="max-w-7xl w-full flex justify-between items-center text-xs font-mono uppercase tracking-widest text-gray-400 border-t border-black/5 pt-8">
         <p className="footer-reveal">© {new Date().getFullYear()} AMMAR</p>
         <div className="footer-reveal flex items-center gap-3">
            <span className="status-dot"></span>
            <span>Based in Logic, Operates Globally</span>
         </div>
         <p className="footer-reveal hidden md:block">ALL RIGHTS RESERVED</p>
      </div>

    </footer>
  );
}

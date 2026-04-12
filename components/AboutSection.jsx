'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutSection() {
  const container = useRef(null);

  useGSAP(() => {
    gsap.from('.about-reveal', {
      y: 30,
      opacity: 0,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.current,
        start: 'top 75%',
      }
    });
  }, { scope: container });

  return (
    <section id="about" ref={container} className="w-full bg-white text-black pt-32 pb-64 px-6 lg:px-16">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        
        {/* Core Description - Column 1/3 */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <h3 className="about-reveal text-4xl font-black uppercase tracking-[-0.05em] leading-[0.85] -ml-1">Logic Over Ego</h3>
          <p className="about-reveal text-gray-600 font-medium leading-relaxed">
            I am a software engineer focused on building durable backends, computer vision pipelines, and seamless frontends. I believe in architectural integrity, zero-bloat dependencies, and designing for scale from day zero.
          </p>
          <div className="about-reveal mt-4">
             <a href="#" className="font-mono text-sm uppercase tracking-widest text-black border-b border-black hover:text-red-600 hover:border-red-600 transition-colors pb-1">Read Full Journal</a>
          </div>
        </div>

        {/* Technical Stack - Column 2/3 */}
        <div className="lg:col-span-4 flex flex-col gap-12">
          
          <div className="about-reveal">
            <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Core Stack</h4>
            <ul className="text-xl font-bold uppercase tracking-tight flex flex-col gap-2">
               <li>TypeScript / Node.js</li>
               <li>Golang</li>
               <li>Python / PyTorch</li>
               <li>Next.js / React</li>
               <li>PostgreSQL & Redis</li>
            </ul>
          </div>
          
          <div className="about-reveal">
            <h4 className="font-mono text-xs text-gray-400 uppercase tracking-widest mb-4">Disciplines</h4>
            <ul className="text-xl font-medium tracking-tight text-gray-600 flex flex-col gap-2">
               <li>API Design</li>
               <li>Computer Vision</li>
               <li>Cloud Architecture</li>
               <li>Smart Systems</li>
               <li>UX/UI Execution</li>
            </ul>
          </div>
          
        </div>

        {/* Accent / Philosophy - Column 3/3 */}
        <div className="lg:col-span-4 flex flex-col gap-10">
          <div className="about-reveal bg-gray-100 p-10 flex flex-col items-center justify-center aspect-square text-center">
             <span className="text-6xl text-red-600 mb-4 transition-transform hover:scale-110 duration-500">∞</span>
             <h4 className="text-2xl font-black tracking-tight uppercase">Continuous Calibration</h4>
          </div>
        </div>

      </div>

    </section>
  );
}

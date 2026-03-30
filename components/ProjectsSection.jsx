'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Smart Traffic Vision',
    type: 'Computer Vision',
    year: '2025',
    img: 'https://images.unsplash.com/photo-1541888086082-dd3b1154ce17?auto=format&fit=crop&q=80&w=1600&h=1200', // Premium minimal architecture/road
  },
  {
    title: 'Financial Ledger',
    type: 'FinTech Backend',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1620325867502-221ddb5faa5f?auto=format&fit=crop&q=80&w=1600&h=1200', // Premium abstract data
  },
  {
    title: 'Object Detect AI',
    type: 'Machine Learning',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1600&h=1200', // Premium hardware/tech
  },
];

export default function ProjectsSection() {
  const sectionRef = useRef(null);

  useGSAP(() => {
    // Parallax effect on all project images
    gsap.utils.toArray('.proj-img-wrap').forEach((wrap) => {
      const img = wrap.querySelector('img');
      gsap.to(img, {
        yPercent: 15,
        ease: 'none',
        scrollTrigger: {
          trigger: wrap,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      });
    });

    // Reveal project labels
    gsap.utils.toArray('.proj-item').forEach((item) => {
      gsap.from(item.querySelectorAll('.proj-label'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: item,
          start: 'top 85%',
        }
      });
    });
  }, { scope: sectionRef });

  return (
    <section id="works" ref={sectionRef} className="w-full bg-white text-black py-40 px-6 lg:px-16 overflow-hidden">
      
      {/* Section Header */}
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-4 mb-32">
        <h3 className="hero-text-reveal text-6xl md:text-8xl font-black uppercase tracking-tighter">
          Select Works
        </h3>
        <p className="font-mono text-xs tracking-widest uppercase text-gray-500 max-w-sm">
          A showcase of recent enterprise software architecture, backend API design, and machine learning models.
        </p>
      </div>

      {/* Asymmetric Project Grid */}
      <div className="max-w-7xl mx-auto flex flex-col gap-32">
        {projects.map((proj, idx) => (
          <div 
            key={idx} 
            className={`proj-item w-full lg:w-3/4 flex flex-col group cursor-pointer ${idx % 2 === 1 ? 'lg:self-end' : 'lg:self-start'}`}
          >
            {/* Image Wrap */}
            <div className="proj-img-wrap relative w-full h-[60vh] overflow-hidden bg-gray-100 flex items-center justify-center">
              <img 
                src={proj.img} 
                alt={proj.title}
                className="absolute inset-0 w-full h-[120%] object-cover object-center grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
                style={{ top: '-10%' }}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/opacity-0 group-hover:bg-black/10 transition-colors duration-500"></div>
            </div>
            
            {/* Labels under image */}
            <div className="flex justify-between items-start pt-6 border-t-0 border-black/10 mt-6">
              <h4 className="proj-label text-3xl font-bold uppercase tracking-tight">{proj.title}</h4>
              <div className="proj-label flex flex-col items-end gap-1">
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">{proj.type}</span>
                <span className="font-mono text-xs uppercase tracking-widest text-gray-400">{proj.year}</span>
              </div>
            </div>
          </div>
        ))}
        
        {/* The Red Block accent component (Editorial highlight) */}
        <div className="proj-item w-full lg:w-1/2 aspect-square lg:self-center bg-red-600 text-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-[0.98]">
           <span className="proj-label text-xl font-mono uppercase tracking-widest mb-4 opacity-70">Archive</span>
           <h4 className="proj-label text-5xl font-black uppercase tracking-tight">View All</h4>
        </div>

      </div>
    </section>
  );
}

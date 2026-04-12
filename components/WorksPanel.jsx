'use client';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import PanelOverlay from './PanelOverlay';

const projects = [
  {
    title: 'Smart Traffic Vision',
    type: 'Computer Vision',
    year: '2025',
    img: 'https://images.unsplash.com/photo-1541888086082-dd3b1154ce17?auto=format&fit=crop&q=70&w=1200&h=900',
    description: 'YOLOv8-powered vehicle detection and traffic flow analysis for smart city infrastructure.',
  },
  {
    title: 'Financial Ledger',
    type: 'FinTech Backend',
    year: '2024',
    img: 'https://images.unsplash.com/photo-1620325867502-221ddb5faa5f?auto=format&fit=crop&q=70&w=1200&h=900',
    description: 'High-concurrency ledger API with double-entry bookkeeping, built on Node.js and PostgreSQL.',
  },
  {
    title: 'Object Detect AI',
    type: 'Machine Learning',
    year: '2023',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=70&w=1200&h=900',
    description: 'Real-time object detection pipeline for industrial quality assurance using PyTorch.',
  },
];

export default function WorksPanel({ isOpen, onClose }) {
  const sectionRef = useRef(null);

  useGSAP(() => {
    if (!isOpen) return;

    // Parallax images inside the panel (runs after panel is open)
    const timeout = setTimeout(() => {
      gsap.utils.toArray('.works-img-wrap').forEach((wrap) => {
        const img = wrap.querySelector('img');
        if (!img) return;

        // Simple hover scale since we don't have ScrollTrigger in a panel
        wrap.addEventListener('mouseenter', () => {
          gsap.to(img, { scale: 1.05, duration: 0.8, ease: 'power3.out' });
        });
        wrap.addEventListener('mouseleave', () => {
          gsap.to(img, { scale: 1, duration: 0.8, ease: 'power3.out' });
        });
      });
    }, 800);

    return () => clearTimeout(timeout);
  }, { scope: sectionRef, dependencies: [isOpen] });

  return (
    <PanelOverlay isOpen={isOpen} onClose={onClose} title="Selected Works">
      <div ref={sectionRef} className="w-full min-h-full">

        {/* Panel Hero */}
        <div className="px-6 lg:px-16 pt-20 pb-16 max-w-7xl mx-auto">
          <h2 className="panel-reveal text-6xl md:text-8xl lg:text-[8vw] font-black uppercase tracking-[-0.05em] leading-[0.85] -ml-1">
            Select<br/>Works
          </h2>
          <p className="panel-reveal font-mono text-xs tracking-widest uppercase text-gray-500 max-w-md mt-6">
            Enterprise software architecture, backend API design, and machine learning models.
          </p>
        </div>

        {/* Project List */}
        <div className="px-6 lg:px-16 pb-32 max-w-7xl mx-auto flex flex-col gap-24">
          {projects.map((proj, idx) => (
            <div 
              key={idx} 
              className={`panel-reveal w-full lg:w-3/4 flex flex-col group cursor-pointer ${idx % 2 === 1 ? 'lg:self-end' : 'lg:self-start'}`}
            >
              {/* Image Wrap */}
              <div className="works-img-wrap relative w-full h-[50vh] lg:h-[60vh] overflow-hidden bg-gray-100">
                <img 
                  src={proj.img} 
                  alt={proj.title}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover object-center grayscale group-hover:grayscale-0 transition-all duration-700 ease-out will-change-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
              </div>
              
              {/* Labels */}
              <div className="flex justify-between items-start pt-6">
                <div>
                  <h3 className="text-3xl font-bold uppercase tracking-[-0.04em]">{proj.title}</h3>
                  <p className="text-gray-500 mt-2 max-w-sm text-sm leading-relaxed">{proj.description}</p>
                </div>
                <div className="flex flex-col items-end gap-1 shrink-0">
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-400">{proj.type}</span>
                  <span className="font-mono text-xs uppercase tracking-widest text-gray-400">{proj.year}</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Archive Block */}
          <div className="panel-reveal w-full lg:w-1/2 aspect-square lg:self-center bg-red-600 text-white flex flex-col items-center justify-center cursor-pointer transition-transform duration-500 hover:scale-[0.98]">
             <span className="text-xl font-mono uppercase tracking-widest mb-4 opacity-70">Archive</span>
             <h4 className="text-4xl lg:text-5xl font-black uppercase tracking-[-0.05em]">View All</h4>
          </div>
        </div>

      </div>
    </PanelOverlay>
  );
}

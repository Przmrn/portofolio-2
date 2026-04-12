import React from 'react';
import PixelCard from './PixelCard';

export default function HeroSection() {
  return (
    <PixelCard
      variant="brutalist"
      className="w-full min-h-screen border-none rounded-none bg-white text-black"
    >
      <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-between pointer-events-auto">
        
        {/* Top Header Row */}
        <div className="flex justify-between items-start">
          {/* Top Left */}
          <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-gray-500">
            <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse" />
            AMMAR_DEV
          </div>

          {/* Top Right */}
          <div className="flex flex-col items-end gap-1 font-mono text-[10px] uppercase tracking-widest text-gray-400">
            <span>LATITUDE: 5.5483° N</span>
            <span>FOCAL DEPTH: YOLOv8</span>
          </div>
        </div>

        {/* Center / Main Title */}
        <div className="absolute top-1/2 -translate-y-1/2 left-8 md:left-12 flex flex-col pointer-events-none select-none">
          <h1 className="text-[14vw] font-black leading-[0.8] tracking-tighter text-black m-0">
            AMMAR
          </h1>
          <h1 
            className="text-[14vw] font-black leading-[0.8] tracking-tighter text-transparent ml-8 md:ml-24 m-0"
            style={{ WebkitTextStroke: '2px black' }}
          >
            DEVELOPER
          </h1>
        </div>

        {/* Bottom Content Row */}
        <div className="flex justify-between items-end relative z-10 w-full mt-auto">
          {/* Bottom Left */}
          <div className="flex flex-col gap-4 max-w-sm md:max-w-md">
            <p className="font-sans text-sm md:text-base leading-relaxed text-gray-800">
              Full-Stack Developer & Computer Vision Engineer — <br className="hidden md:block" />
              building systems that matter with clean code and quiet precision.
            </p>
            <div className="flex flex-col gap-1 font-mono text-[10px] md:text-xs uppercase tracking-widest text-gray-500">
              <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600" />
                AVAILABLE FOR FREELANCE
              </div>
              <span className="text-gray-400">[ ARCHIVE 2026 ]</span>
              <span className="text-gray-400 mt-2">COMPUTER VISION & BACKEND SYSTEMS</span>
            </div>
          </div>

          {/* Bottom Right */}
          <div className="font-mono text-xs uppercase tracking-widest border border-gray-200 px-4 py-2 hover:bg-black hover:text-white transition-colors cursor-pointer bg-white/50 backdrop-blur-sm pointer-events-auto">
            EXPLORE DEPTH
          </div>
        </div>

      </div>
    </PixelCard>
  );
}

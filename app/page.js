'use client';
import { useState } from 'react';
import SmoothScroll from '../components/SmoothScroll';
import Preloader from '../components/Preloader';
import NoiseOverlay from '../components/NoiseOverlay';
import HeroSection from '../components/HeroSection';
import Marquee from '../components/Marquee';
import ProjectsSection from '../components/ProjectsSection';
import ManifestoSection from '../components/ManifestoSection';
import AboutSection from '../components/AboutSection';
import FooterSection from '../components/FooterSection';

export default function Home() {
  const [loading, setLoading] = useState(true);

  return (
    <SmoothScroll>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* Subtle dirt/film grain over everything for editorial feel */}
      <NoiseOverlay />

      <main className="bg-white min-h-screen text-black flex flex-col selection:bg-red-600 selection:text-white">
        {!loading && (
          <>
            <HeroSection />
            <Marquee text="IT DEVELOPER" />
            <ProjectsSection />
            <ManifestoSection />
            <Marquee text="QUIET TOOLS" bg="bg-red-600" fg="text-white" direction={-1} />
            <AboutSection />
            <FooterSection />
          </>
        )}
      </main>
    </SmoothScroll>
  );
}
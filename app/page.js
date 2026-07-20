"use client";
import { useState } from "react";
import SmoothScroll from "../components/SmoothScroll";
import Preloader from "../components/Preloader";
import TopBar from "../components/TopBar";
import ScrollMorph from "../components/ScrollMorph";
import HeroBrutalist from "../components/HeroBrutalist";
import ProjectsGrid from "../components/ProjectsGrid";
import AboutBrutalist from "../components/AboutBrutalist";
import ContactSection from "../components/ContactSection";
import BackToTopCTA from "../components/BackToTopCTA";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <SmoothScroll>
        <TopBar />
        <ScrollMorph first index={0}>
          <HeroBrutalist />
        </ScrollMorph>
        <ScrollMorph index={1}>
          <ProjectsGrid />
        </ScrollMorph>
        <ScrollMorph index={2}>
          <AboutBrutalist />
        </ScrollMorph>
        <ScrollMorph tone="dark" last index={3}>
          <ContactSection />
        </ScrollMorph>
        <BackToTopCTA />
      </SmoothScroll>
    </>
  );
}

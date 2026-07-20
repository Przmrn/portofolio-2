"use client";
import { useState } from "react";
import Preloader from "../components/Preloader";
import TopBar from "../components/TopBar";
import FullPageScroll, { PageProvider } from "../components/FullPageScroll";
import PageDots from "../components/PageDots";
import HeroBrutalist from "../components/HeroBrutalist";
import ProjectsGrid from "../components/ProjectsGrid";
import AboutBrutalist from "../components/AboutBrutalist";
import ContactSection from "../components/ContactSection";

const SLIDE_COUNT = 4;

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <Preloader onComplete={() => setLoaded(true)} />}
      <PageProvider slideCount={SLIDE_COUNT}>
        <TopBar />
        <FullPageScroll>
          <HeroBrutalist />
          <ProjectsGrid />
          <AboutBrutalist />
          <ContactSection />
        </FullPageScroll>
        <PageDots />
      </PageProvider>
    </>
  );
}

import TopNavigation from "../components/ui/TopNavigation";
import SmoothScroll from "../components/ui/SmoothScroll";
import IridescentHero from "../components/ui/IridescentHero";
import Manifesto from "../components/ui/Manifesto";
import WorkList from "../components/ui/WorkList";
import Expertise from "../components/ui/Expertise";
import ContactEditorial from "../components/ui/ContactEditorial";
import Footer from "../components/ui/Footer";

/* magazine pacing, normal document scroll.
   Full-bleed dark hero breaks the 1078px container; body sections
   alternate paper / obsidian bands with generous 46px+ rhythm. */
export default function Home() {
  return (
    <>
      <SmoothScroll />
      <TopNavigation />
      <main>
        <IridescentHero />
        <Manifesto />
        <WorkList />
        <Expertise />
        <ContactEditorial />
      </main>
      <Footer />
    </>
  );
}

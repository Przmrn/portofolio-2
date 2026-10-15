"use client";

import {useEffect, useState} from "react";
import {motion} from "framer-motion";
import VantaTopology from "./VantaTopology";

/* Full-viewport hero — one monumental headline, centered, on white.
   The headline itself has no entrance fade: the loader monogram warps
   directly onto it, and the fading curtain is the reveal. Only kicker
   and corner metas fade in staggered during the warp (via "intro:done").
   No subhead, no CTA — per the reference. */
export default function IridescentHero() {
    const [entered, setEntered] = useState(false);

    useEffect(() => {
        const onDone = () => setEntered(true);
        window.addEventListener("intro:done", onDone);
        return () => window.removeEventListener("intro:done", onDone);
    }, []);

    return (
        <section id="top" className="iridescent-stage" aria-label="Intro">
            <VantaTopology/>
            <div className="hero-center">
                <motion.div
                    className="hero-kicker"
                    initial={false}
                    animate={entered ? {opacity: 0.85, y: 0} : {opacity: 0, y: 10}}
                    transition={{duration: 0.6, delay: 1.2, ease: [0.19, 1, 0.22, 1]}}
                    style={{willChange: "transform, opacity"}}
                >
          <span className="text-micro" style={{color: "rgba(0,0,0,0.85)"}}>
            Full-Stack Developer
          </span>
                    <span className="text-micro" style={{color: "rgba(0,0,0,0.45)"}}>
            ·
          </span>
                    <span className="text-micro" style={{color: "rgba(0,0,0,0.85)"}}>
            Computer Vision Engineer
          </span>
                </motion.div>
                <h1 id="hero-headline" className="text-display" style={{color: "var(--color-obsidian)"}}>
                    <span aria-hidden="true">A</span>
                    <span className="hero-slash" aria-hidden="true">{"//"}</span>
                    <span aria-hidden="true">M</span>
                    <span className="sr-only">A // M</span>
                </h1>
            </div>

            <div className="hero-foot">
                <div className="monopo-container hero-foot__inner">
                    <motion.p
                        className="hero-meta hero-meta--left"
                        initial={false}
                        animate={entered ? {opacity: 0.8} : {opacity: 0}}
                        transition={{duration: 0.5, delay: 1.35, ease: [0.19, 1, 0.22, 1]}}
                    >
                        Banda Aceh, ID
                        <br/>
                        5.5501° N, 95.3222° E
                    </motion.p>
                    <motion.p
                        className="hero-meta hero-meta--center"
                        initial={false}
                        animate={entered ? {opacity: 0.5} : {opacity: 0}}
                        transition={{duration: 0.5, delay: 1.45, ease: [0.19, 1, 0.22, 1]}}
                    >
                        Scroll
                    </motion.p>
                    <motion.p
                        className="hero-meta hero-meta--right"
                        initial={false}
                        animate={entered ? {opacity: 0.8} : {opacity: 0}}
                        transition={{duration: 0.5, delay: 1.35, ease: [0.19, 1, 0.22, 1]}}
                    >
                        Portfolio 2025 — 2026
                        <br/>
                        4 selected systems
                    </motion.p>
                </div>
            </div>
        </section>
    );
}

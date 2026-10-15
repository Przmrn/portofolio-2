"use client";

import {useEffect, useRef, useState} from "react";
import {motion} from "framer-motion";
import DecryptedText from "./DecryptedText";
import {getLenis} from "./scroll";

const EASE_MONOPO = [0.19, 1, 0.22, 1];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+";

/* Loader timeline — decrypt, hold, warp into the hero:
 *  1. "A // M" unscrambles (~1.6s)
 *  2. rests fully legible for 1s
 *  3. warp (1.8s): the monogram flies to the hero headline's exact
 *     rect (FLIP-measured translate + scale) while its ink fades
 *     white→black; the curtain crossfades out in sync — no slide-up.
 *     The hero headline fades in at the landing spot to complete
 *     the illusion of one continuous text.
 * The warp animates transform/opacity/paint only — letter-spacing is
 * deliberately static (animating it forces layout every frame). */
const PASS_ONE_MS = 18 * 90;
const HOLD_MS = 1000;
const WARP_S = 1.8;

export default function LoadingScreen() {
    const [warp, setWarp] = useState(null);
    const [gone, setGone] = useState(false);
    const timers = useRef([]);
    const markRef = useRef(null);

    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            window.dispatchEvent(new Event("intro:done"));
            timers.current.push(requestAnimationFrame(() => setGone(true)));
            return () => timers.current.forEach(cancelAnimationFrame);
        }

        document.body.style.overflow = "hidden";
        getLenis()?.stop();

        const startWarp = () => {
            const from = markRef.current?.getBoundingClientRect();
            const to = document
                .getElementById("hero-headline")
                ?.getBoundingClientRect();
            // Static warp: position never travels (both texts are
            // centered) — only the size morphs to the headline.
            let s = 1;
            if (from && to && from.width > 0 && to.width > 0) {
                s = to.width / from.width;
            }
            // Hero content reveals follow during the warp.
            window.dispatchEvent(new Event("intro:done"));
            setWarp({s});
            timers.current.push(setTimeout(() => setGone(true), WARP_S * 1000 + 120));
        };

        timers.current = [
            // Decrypt has resolved and rested clean — warp it home.
            setTimeout(startWarp, PASS_ONE_MS + HOLD_MS),
        ];

        return () => {
            timers.current.forEach(clearTimeout);
            timers.current.forEach(cancelAnimationFrame);
            document.body.style.overflow = "";
            getLenis()?.start();
        };
    }, []);

    if (gone) return null;

    return (
        <motion.div
            role="status"
            aria-label="Loading portfolio"
            className="loader"
            initial={false}
            animate={warp ? {opacity: 0} : {opacity: 1}}
            transition={
                warp
                    ? {duration: WARP_S, ease: EASE_MONOPO}
                    : {duration: 0.3, ease: "easeOut"}
            }
        >
            <div className="loader__stage">
                <motion.div
                    ref={markRef}
                    initial={false}
                    animate={
                        warp
                            ? {
                                // Size morphs in place — no travel.
                                scale: [1, 1.12, warp.s],
                                // Visible through the morph, dissolving on docking.
                                // Ink already matches the hero (black on paper),
                                // so no color transition is needed.
                                opacity: [1, 1, 0],
                                // Motion blur through the fast middle, tack-sharp dock.
                                // Kept shallow (8px): blur repaints every frame.
                                filter: ["blur(0px)", "blur(8px)", "blur(0px)"],
                            }
                            : {scale: 1, opacity: 1}
                    }
                    transition={
                        warp
                            ? {
                                scale: {
                                    duration: WARP_S,
                                    times: [0, 0.35, 1],
                                    ease: EASE_MONOPO,
                                },
                                opacity: {
                                    duration: WARP_S,
                                    times: [0, 0.72, 1],
                                    ease: "linear",
                                },
                                filter: {
                                    duration: WARP_S,
                                    times: [0, 0.55, 1],
                                    ease: "easeInOut",
                                },
                            }
                            : {duration: 0.3, ease: "easeOut"}
                    }
                    style={{willChange: "transform, opacity, filter", transformOrigin: "center"}}
                >
                    <DecryptedText
                        text="A // M"
                        animateOn="view"
                        speed={90}
                        maxIterations={18}
                        characters={GLYPHS}
                        parentClassName="loader__decrypt"
                        encryptedClassName="encrypted"
                    />
                </motion.div>
            </div>
        </motion.div>
    );
}

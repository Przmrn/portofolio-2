/* ScrambledText — React Bits component (JS variant), adapted:
 *  - styles via CSS Module so type/color inherit the parent headline
 *  - skips splitting under prefers-reduced-motion (plain readable text)
 *  - one intro scramble on mount so touch devices see it too
 * Inspired by Tom Miller (GSAP community).
 */
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { SplitText } from "gsap/SplitText";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import styles from "./ScrambledText.module.css";

gsap.registerPlugin(SplitText, ScrambleTextPlugin);

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  revealDelay = 0.4,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}) {
  const rootRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const split = SplitText.create(root.querySelector("p"), {
      type: "chars",
      charsClass: styles.char,
    });
    const chars = split.chars;

    chars.forEach((c) => {
      gsap.set(c, {
        display: "inline-block",
        attr: { "data-content": c.innerHTML },
      });
    });

    // One full pass on mount — the effect is pointer-driven otherwise.
    gsap.to(chars, {
      duration: 2.4,
      ease: "none",
      stagger: 0.08,
      scrambleText: {
        text: (i, el) => el.dataset.content || "",
        chars: scrambleChars,
        speed,
        revealDelay,
      },
    });

    const handleMove = (e) => {
      chars.forEach((c) => {
        // Never restart a char mid-scramble — constant retriggering is
        // what makes the effect feel frantic. Let each reveal breathe.
        if (gsap.isTweening(c)) return;

        const { left, top, width, height } = c.getBoundingClientRect();
        const dx = e.clientX - (left + width / 2);
        const dy = e.clientY - (top + height / 2);
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          gsap.to(c, {
            duration: duration * (1 - dist / radius),
            scrambleText: {
              text: c.dataset.content || "",
              chars: scrambleChars,
              speed,
              revealDelay,
            },
            ease: "none",
          });
        }
      });
    };

    root.addEventListener("pointermove", handleMove);

    return () => {
      root.removeEventListener("pointermove", handleMove);
      split.revert();
    };
  }, [radius, duration, speed, revealDelay, scrambleChars]);

  return (
    <div ref={rootRef} className={`${styles.textBlock} ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollMorph({
  children,
  tone = "light",
  first = false,
  last = false,
  index = 0,
}) {
  const rootRef = useRef(null);
  const innerRef = useRef(null);
  const accentRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const inner = innerRef.current;
    const accent = accentRef.current;
    if (!root || !inner) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      gsap.set([inner, accent].filter(Boolean), { clearProps: "all" });
      return undefined;
    }

    const origin = index % 2 === 0 ? "0% 50%" : "100% 50%";

    const ctx = gsap.context(() => {
      gsap.set(inner, {
        transformOrigin: origin,
        willChange: "transform, opacity, filter, clip-path",
      });

      if (accent) {
        gsap.set(accent, {
          scaleX: 0,
          opacity: 0,
          transformOrigin: index % 2 === 0 ? "0% 50%" : "100% 50%",
        });
      }

      if (!first) {
        gsap.fromTo(
          inner,
          {
            y: 96,
            scale: 0.965,
            opacity: 0.72,
            filter: "blur(8px)",
            clipPath:
              "polygon(0 10%, 100% 0, 100% 100%, 0 100%)",
          },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            filter: "blur(0px)",
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            ease: "none",
            scrollTrigger: {
              trigger: root,
              start: "top 92%",
              end: "top 34%",
              scrub: 0.9,
              invalidateOnRefresh: true,
            },
          }
        );

        if (accent) {
          gsap.fromTo(
            accent,
            { scaleX: 0, opacity: 0 },
            {
              scaleX: 1,
              opacity: tone === "dark" ? 0.9 : 0.65,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: "top 88%",
                end: "top 48%",
                scrub: 0.7,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      }

      if (!last) {
        gsap.to(inner, {
          y: -64,
          scale: 0.985,
          opacity: 0.82,
          filter: "blur(3px)",
          clipPath: "polygon(0 0, 100% 0, 100% 91%, 0 100%)",
          ease: "none",
          scrollTrigger: {
            trigger: root,
            start: "bottom 78%",
            end: "bottom 18%",
            scrub: 0.9,
            invalidateOnRefresh: true,
          },
        });
      }

      ScrollTrigger.refresh();
    }, root);

    return () => ctx.revert();
  }, [first, index, last, tone]);

  return (
    <div
      ref={rootRef}
      className="scroll-morph"
      data-tone={tone}
      style={{
        position: "relative",
        overflow: "hidden",
        background: tone === "dark" ? "#080707" : "#ffffff",
      }}
    >
      <span
        ref={accentRef}
        aria-hidden="true"
        className="scroll-morph__accent"
      />
      <div ref={innerRef} className="scroll-morph__inner">
        {children}
      </div>
    </div>
  );
}

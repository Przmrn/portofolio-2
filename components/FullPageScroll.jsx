"use client";

import {
  createContext,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  Children,
} from "react";
import gsap from "gsap";

/* ── Context for child components (TopBar, PageDots, etc.) ────────── */
const PageContext = createContext({ current: 0, total: 0, goTo: () => {} });
export const usePageContext = () => useContext(PageContext);

/* ── Constants ────────────────────────────────────────────────────── */
const TRANSITION_DURATION = 0.85;
const EASE = "power3.inOut";
const WHEEL_COOLDOWN = 900; // ms between accepted wheel events
const TOUCH_THRESHOLD = 50; // px swipe distance to trigger

/* ── Tone config per slide (background colors) ────────────────────── */
const TONES = ["light", "light", "light", "dark"]; // hero, projects, about, contact

/* ── Provider wrapper — renders around everything including TopBar ── */
export function PageProvider({ children, slideCount }) {
  const containerRef = useRef(null);
  const slidesRef = useRef([]);
  const currentRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const lastWheelRef = useRef(0);
  const touchStartRef = useRef({ y: 0, time: 0 });

  const [current, setCurrent] = useState(0);
  const total = slideCount;

  /* ── Morph transition ───────────────────────────────────────────── */
  const goTo = useCallback(
    (targetIndex) => {
      if (
        isAnimatingRef.current ||
        targetIndex === currentRef.current ||
        targetIndex < 0 ||
        targetIndex >= total
      )
        return;

      isAnimatingRef.current = true;

      const fromSlide = slidesRef.current[currentRef.current];
      const toSlide = slidesRef.current[targetIndex];
      const direction = targetIndex > currentRef.current ? 1 : -1;

      if (!fromSlide || !toSlide) {
        isAnimatingRef.current = false;
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(fromSlide, { visibility: "hidden", zIndex: 1 });
          isAnimatingRef.current = false;
        },
      });

      // Prepare incoming slide
      gsap.set(toSlide, {
        visibility: "visible",
        zIndex: 3,
        opacity: 0,
        scale: direction > 0 ? 1.04 : 0.94,
        y: direction > 0 ? 80 : -80,
        filter: "blur(8px)",
      });

      // Exit current slide
      tl.to(
        fromSlide,
        {
          opacity: 0,
          scale: direction > 0 ? 0.92 : 1.06,
          y: direction > 0 ? -60 : 60,
          filter: "blur(6px)",
          duration: TRANSITION_DURATION,
          ease: EASE,
        },
        0
      );

      // Enter new slide (slight stagger)
      tl.to(
        toSlide,
        {
          opacity: 1,
          scale: 1,
          y: 0,
          filter: "blur(0px)",
          duration: TRANSITION_DURATION,
          ease: EASE,
        },
        0.06
      );

      currentRef.current = targetIndex;
      setCurrent(targetIndex);
    },
    [total]
  );

  /* ── Register slide refs from FullPageScroll ─────────────────────── */
  const registerSlides = useCallback((refs) => {
    slidesRef.current = refs;
  }, []);

  /* ── Initialize slides whenever refs update ──────────────────────── */
  const initializeSlides = useCallback(() => {
    const slides = slidesRef.current;
    if (!slides.length) return;

    slides.forEach((slide, i) => {
      if (!slide) return;
      gsap.set(slide, {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: i === 0 ? 2 : 1,
        opacity: i === 0 ? 1 : 0,
        scale: i === 0 ? 1 : 1.04,
        filter: i === 0 ? "blur(0px)" : "blur(8px)",
        y: i === 0 ? 0 : 80,
        willChange: "transform, opacity, filter",
        visibility: i === 0 ? "visible" : "hidden",
      });
    });
  }, []);

  /* ── Wheel handler (on document — captures all wheel events) ─────── */
  useEffect(() => {
    const onWheel = (e) => {
      e.preventDefault();

      const now = Date.now();
      if (now - lastWheelRef.current < WHEEL_COOLDOWN) return;
      if (isAnimatingRef.current) return;
      if (Math.abs(e.deltaY) < 30) return;

      lastWheelRef.current = now;

      if (e.deltaY > 0) {
        goTo(currentRef.current + 1);
      } else {
        goTo(currentRef.current - 1);
      }
    };

    document.addEventListener("wheel", onWheel, { passive: false });
    return () => document.removeEventListener("wheel", onWheel);
  }, [goTo]);

  /* ── Touch handler ──────────────────────────────────────────────── */
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartRef.current = {
        y: e.touches[0].clientY,
        time: Date.now(),
      };
    };

    const onTouchEnd = (e) => {
      if (isAnimatingRef.current) return;

      const deltaY =
        touchStartRef.current.y - e.changedTouches[0].clientY;
      const elapsed = Date.now() - touchStartRef.current.time;

      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;
      if (elapsed > 600) return;

      if (deltaY > 0) {
        goTo(currentRef.current + 1);
      } else {
        goTo(currentRef.current - 1);
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [goTo]);

  /* ── Keyboard handler ───────────────────────────────────────────── */
  useEffect(() => {
    const onKeyDown = (e) => {
      if (isAnimatingRef.current) return;

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          goTo(currentRef.current + 1);
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          goTo(currentRef.current - 1);
          break;
        case "Home":
          e.preventDefault();
          goTo(0);
          break;
        case "End":
          e.preventDefault();
          goTo(total - 1);
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goTo, total]);

  return (
    <PageContext.Provider
      value={{ current, total, goTo, registerSlides, initializeSlides }}
    >
      <div data-tone={TONES[current] || "light"} style={{ width: "100%", height: "100%" }}>
        {children}
      </div>
    </PageContext.Provider>
  );
}

/* ── Scroll container — renders the slides ─────────────────────────── */
export default function FullPageScroll({ children }) {
  const localSlidesRef = useRef([]);
  const { registerSlides, initializeSlides } = usePageContext();
  const total = Children.count(children);
  const { current } = usePageContext();

  useEffect(() => {
    registerSlides(localSlidesRef.current);
    initializeSlides();
  }, [total, registerSlides, initializeSlides]);

  return (
    <div
      className="full-page-scroll"
      data-tone={TONES[current] || "light"}
    >
      {Children.map(children, (child, i) => (
        <div
          key={i}
          ref={(el) => {
            localSlidesRef.current[i] = el;
          }}
          className="full-page-slide"
          data-slide-index={i}
          data-tone={TONES[i] || "light"}
        >
          {child}
        </div>
      ))}
    </div>
  );
}

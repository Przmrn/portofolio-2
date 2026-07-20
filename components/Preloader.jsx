"use client";
import { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const barWrapRef = useRef(null);
  const barFillRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  /* 1. Drive progress 0 → 100 over ~2.5s */
  useEffect(() => {
    const proxy = { v: 0 };
    const tween = gsap.to(proxy, {
      v: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate: () => setProgress(Math.round(proxy.v)),
      onComplete: () => setDone(true),
    });
    return () => tween.kill();
  }, []);

  /* 2. Entrance animation */
  useGSAP(() => {
    if (!titleRef.current || !barWrapRef.current) return;
    const tl = gsap.timeline({ delay: 0.2 });
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      0
    );
    tl.fromTo(
      barWrapRef.current,
      { opacity: 0, scaleX: 0.6 },
      { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out" },
      0.3
    );
  }, { scope: overlayRef });

  /* 3. Exit animation */
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!done) return;
    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current?.(),
    });
    tl.to(titleRef.current, {
      y: -20, opacity: 0, duration: 0.4, ease: "power2.in",
    });
    tl.to(barWrapRef.current, {
      opacity: 0, duration: 0.3, ease: "power2.in",
    }, "-=0.2");
    tl.to(overlayRef.current, {
      y: "-100%", duration: 0.8, ease: "power3.inOut",
    }, "-=0.1");
    return () => tl.kill();
  }, [done]);

  return (
    <div
      ref={overlayRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#080707",
      }}
    >
      {/* Title */}
      <h1
        ref={titleRef}
        style={{
          fontFamily: "var(--font-display, 'Archivo Black', Impact, sans-serif)",
          fontWeight: 400,
          fontSize: "clamp(36px, 6vw, 64px)",
          letterSpacing: "0.042em",
          textTransform: "uppercase",
          color: "#ffffff",
          marginBottom: "32px",
          opacity: 0,
          userSelect: "none",
        }}
      >
        A <span style={{ color: "#ebff00" }}>//</span> M
      </h1>

      {/* Progress bar */}
      <div
        ref={barWrapRef}
        style={{
          width: "100%",
          maxWidth: "320px",
          padding: "0 24px",
          opacity: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "2px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "1px",
            overflow: "hidden",
          }}
        >
          <div
            ref={barFillRef}
            style={{
              width: `${progress}%`,
              height: "100%",
              background: "#ebff00",
              transition: "width 0.1s linear",
            }}
          />
        </div>

        {/* Counter */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "12px",
            fontFamily: "var(--font-mono, 'IBM Plex Mono', monospace)",
            fontSize: "10px",
            fontWeight: 600,
            letterSpacing: "0.109em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.3)",
          }}
        >
          <span>LOADING</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
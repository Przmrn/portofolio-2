'use client';
import { useRef, useState, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Progress } from '@/components/ui/progress';

export default function Preloader({ onComplete }) {
  const overlayRef = useRef(null);
  const titleRef = useRef(null);
  const barWrapRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [done, setDone] = useState(false);

  // 1. Simulate loading: drive progress from 0 → 100 over ~2.5s
  useEffect(() => {
    const proxy = { v: 0 };
    const tween = gsap.to(proxy, {
      v: 100,
      duration: 2.5,
      ease: 'power2.inOut',
      onUpdate: () => setProgress(Math.round(proxy.v)),
      onComplete: () => setDone(true),
    });
    return () => tween.kill();
  }, []);

  // 2. Entrance animation: text pops up as progress begins
  useGSAP(() => {
    if (!titleRef.current || !barWrapRef.current) return;

    const tl = gsap.timeline({ delay: 0.2 });

    // Text reveals: start hidden, animate up
    tl.fromTo(
      titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
      0
    );

    // Progress bar container fades in
    tl.fromTo(
      barWrapRef.current,
      { opacity: 0, scaleX: 0.6 },
      { opacity: 1, scaleX: 1, duration: 0.6, ease: 'power2.out' },
      0.3
    );
  }, { scope: overlayRef });

  // 3. Exit animation: once progress hits 100
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    if (!done) return;

    const tl = gsap.timeline({
      onComplete: () => onCompleteRef.current?.(),
    });

    // Fade out the text first
    tl.to(titleRef.current, {
      y: -20,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    });

    // Fade out the progress bar
    tl.to(barWrapRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    }, '-=0.2');

    // Slide the entire overlay up and out
    tl.to(overlayRef.current, {
      y: '-100%',
      duration: 0.8,
      ease: 'power3.inOut',
    }, '-=0.1');

    return () => tl.kill();
  }, [done]);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
    >
      {/* AMMAR.DEV title */}
      <h1
        ref={titleRef}
        className="text-white font-black text-4xl md:text-5xl lg:text-6xl tracking-[-0.04em] mb-8 opacity-0 select-none"
        style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
      >
        AMMAR<span className="text-red-600">.</span>DEV
      </h1>

      {/* Progress bar container */}
      <div ref={barWrapRef} className="w-full max-w-sm px-6 opacity-0">
        <Progress
          value={progress}
          className="h-[3px] bg-white/10 rounded-full"
        />

        {/* Percentage counter */}
        <div className="flex justify-between mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
          <span>Loading</span>
          <span>{progress}%</span>
        </div>
      </div>
    </div>
  );
}
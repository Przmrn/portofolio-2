'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import Lenis from 'lenis';

/**
 * PanelOverlay — Fullscreen animated overlay panel.
 *
 * Architectural role:
 *   - Wipes in over the main menu with a clip-path reveal from bottom
 *   - Contains a close/back button
 *   - Internal Lenis scroll for panel content
 *   - White background for editorial contrast against dark menu
 *
 * Props:
 *   - isOpen: boolean — whether the panel is visible
 *   - onClose: () => void — callback to close the panel
 *   - title: string — panel title shown in the header
 *   - children: ReactNode — panel content
 */
export default function PanelOverlay({ isOpen, onClose, title, children }) {
  const panelRef = useRef(null);
  const contentRef = useRef(null);
  const lenisRef = useRef(null);
  const isAnimating = useRef(false);

  // GSAP entrance/exit animation
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    if (isOpen) {
      // Show the panel DOM
      panel.style.display = 'flex';
      isAnimating.current = true;

      // Animate IN: clip-path from bottom
      gsap.fromTo(panel,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 0.9,
          ease: 'power4.inOut',
          onComplete: () => {
            isAnimating.current = false;
          }
        }
      );

      // Stagger reveal inner content
      gsap.fromTo(
        panel.querySelectorAll('.panel-reveal'),
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: 'power3.out',
          delay: 0.4,
        }
      );

    } else {
      // Animate OUT: clip-path to top
      if (panel.style.display !== 'none') {
        isAnimating.current = true;
        gsap.to(panel, {
          clipPath: 'inset(0 0 100% 0)',
          duration: 0.7,
          ease: 'power4.inOut',
          onComplete: () => {
            panel.style.display = 'none';
            isAnimating.current = false;
          }
        });
      }
    }
  }, [isOpen]);

  // Internal Lenis scroll for the panel content
  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    // Small delay to let entrance animation start
    const timeout = setTimeout(() => {
      const lenis = new Lenis({
        wrapper: contentRef.current,
        content: contentRef.current.firstElementChild,
        lerp: 0.1,
        smoothWheel: true,
        wheelMultiplier: 0.8,
      });

      let raf;
      const loop = (time) => {
        lenis.raf(time);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      lenisRef.current = { lenis, raf };
    }, 500);

    return () => {
      clearTimeout(timeout);
      if (lenisRef.current) {
        cancelAnimationFrame(lenisRef.current.raf);
        lenisRef.current.lenis.destroy();
        lenisRef.current = null;
      }
    };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e) => {
      if (e.key === 'Escape' && !isAnimating.current) {
        onClose?.();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  return (
    <div
      ref={panelRef}
      className="fixed inset-0 z-40 flex flex-col bg-white text-black"
      style={{ display: 'none', clipPath: 'inset(100% 0 0 0)' }}
      role="dialog"
      aria-modal="true"
      aria-label={title}
    >
      {/* Panel Header */}
      <header className="panel-reveal flex items-center justify-between px-6 lg:px-16 py-6 border-b border-black/10 shrink-0">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
          {title}
        </span>
        <button
          onClick={() => !isAnimating.current && onClose?.()}
          className="group flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-black hover:text-red-600 transition-colors cursor-pointer"
          aria-label="Close panel"
        >
          <span>Close</span>
          <span className="relative w-6 h-6 flex items-center justify-center">
            <span className="absolute w-5 h-[1.5px] bg-current rotate-45 transition-transform group-hover:rotate-[135deg]" />
            <span className="absolute w-5 h-[1.5px] bg-current -rotate-45 transition-transform group-hover:rotate-[-135deg]" />
          </span>
        </button>
      </header>

      {/* Panel Scrollable Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto overflow-x-hidden">
        <div>
          {children}
        </div>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import {
  Search, User, Menu, X,
  Play, Star, Clock, Calendar,
  ChevronLeft, ChevronRight,
} from 'lucide-react';

// ─── Data ─────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  'Movies',
  'TV Series',
  "Editor's Pick",
  'Interviews',
  'User Reviews',
];

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_094145_4a271a6c-3869-4f1c-8aa7-aeb0cb227994.mp4';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Tiny wrapper so every animated element gets the same class
 * and only needs an inline animationDelay.
 */
function Reveal({ delay = 0, className = '', style = {}, children, ...rest }) {
  return (
    <div
      className={`animate-blur-fade-up ${className}`}
      style={{ animationDelay: `${delay}ms`, ...style }}
      {...rest}
    >
      {children}
    </div>
  );
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function CinematicHero() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div
      className="relative w-full h-screen bg-black overflow-hidden text-white"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      {/* ── 1. Background Video ─────────────────────────────────────────────
       *  Fixed behind everything at z-0.
       *  object-cover ensures it always fills the viewport.
       */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 0 }}
        src={VIDEO_SRC}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      />

      {/* ── 2. Bottom Blur Overlay ──────────────────────────────────────────
       *  backdrop-blur-xl applied only at the bottom half via a CSS mask.
       *  No dark gradient — only the blur effect.
       *  The mask fades the blur to transparent toward the middle so the
       *  video reads clearly at the top.
       */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 1,
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          maskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
          WebkitMaskImage: 'linear-gradient(to top, black 0%, transparent 45%)',
        }}
      />

      {/* ── 3. Content Layer (sits above video + blur) ──────────────────── */}
      <div className="relative flex flex-col h-full" style={{ zIndex: 10 }}>

        {/* ── NAVBAR ───────────────────────────────────────────────────── */}
        <nav className="flex items-center justify-between px-4 sm:px-6 md:px-12 py-4 md:py-6">

          {/* Logo — delay 0 ms */}
          <Reveal delay={0} className="contents">
            <span className="text-xl md:text-2xl font-bold tracking-wider select-none">
              AMMAR<span className="text-red-500">.</span>
            </span>
          </Reveal>

          {/* Desktop nav links — hidden below lg */}
          <div className="hidden lg:flex items-center gap-6">
            {NAV_LINKS.map((link, i) => (
              <Reveal key={link} delay={100 + i * 50} className="contents">
                <a
                  href="#"
                  className="text-sm text-white/80 hover:text-white transition-colors duration-200"
                >
                  {link}
                </a>
              </Reveal>
            ))}
          </div>

          {/* Right — search + avatar (desktop) + hamburger (mobile) */}
          <div className="flex items-center gap-2">

            {/* Search pill — hidden below sm, delay 350 ms */}
            <Reveal delay={350} className="contents">
              <button className="hidden sm:flex items-center gap-2 liquid-glass rounded-full px-4 md:px-6 py-2 text-sm cursor-pointer">
                <Search size={18} />
                <span>Search</span>
              </button>
            </Reveal>

            {/* Avatar circle — hidden below sm, delay 400 ms */}
            <Reveal delay={400} className="contents">
              <button className="hidden sm:flex items-center justify-center liquid-glass w-10 h-10 rounded-full cursor-pointer">
                <User size={18} />
              </button>
            </Reveal>

            {/* Hamburger — visible below lg, delay 350 ms */}
            <Reveal delay={350} className="contents">
              <button
                className="lg:hidden flex items-center justify-center liquid-glass w-10 h-10 rounded-full cursor-pointer"
                onClick={() => setMenuOpen((v) => !v)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              >
                {/* The two icons crossfade with rotate + scale via inline transitions */}
                <span
                  className="absolute"
                  style={{
                    opacity:    menuOpen ? 0 : 1,
                    transform:  menuOpen ? 'rotate(180deg) scale(0.5)' : 'rotate(0deg) scale(1)',
                    transition: 'opacity 500ms ease-out, transform 500ms ease-out',
                  }}
                >
                  <Menu size={18} />
                </span>
                <span
                  style={{
                    opacity:    menuOpen ? 1 : 0,
                    transform:  menuOpen ? 'rotate(0deg) scale(1)' : 'rotate(-180deg) scale(0.5)',
                    transition: 'opacity 500ms ease-out, transform 500ms ease-out',
                  }}
                >
                  <X size={18} />
                </span>
              </button>
            </Reveal>
          </div>
        </nav>

        {/* ── MOBILE MENU ──────────────────────────────────────────────── */}
        {/*
         * Slides in from above when menuOpen=true.
         * Uses translate-y + opacity for the enter/exit; each link
         * gets a staggered translate-x reveal.
         */}
        <div
          className="lg:hidden absolute left-0 right-0 bg-gray-900/95 backdrop-blur-lg border-t border-b border-gray-800 shadow-2xl"
          style={{
            top:           72,
            zIndex:        40,
            opacity:       menuOpen ? 1 : 0,
            transform:     menuOpen ? 'translateY(0)' : 'translateY(-16px)',
            pointerEvents: menuOpen ? 'auto' : 'none',
            transition:    'opacity 500ms ease-out, transform 500ms ease-out',
          }}
        >
          <div className="py-4 px-4">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link}
                href="#"
                className="flex items-center py-3 px-3 rounded-lg hover:bg-gray-800/50 transition-colors text-sm"
                style={{
                  opacity:    menuOpen ? 1 : 0,
                  transform:  menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                  transition: `opacity 400ms ease ${i * 50}ms, transform 400ms ease ${i * 50}ms`,
                }}
              >
                {link}
              </a>
            ))}

            {/* Search + Profile for < sm screens */}
            <div
              className="sm:hidden flex gap-3 mt-4 pt-4 border-t border-gray-800"
              style={{
                opacity:    menuOpen ? 1 : 0,
                transform:  menuOpen ? 'translateX(0)' : 'translateX(-20px)',
                transition: `opacity 400ms ease ${NAV_LINKS.length * 50}ms, transform 400ms ease ${NAV_LINKS.length * 50}ms`,
              }}
            >
              <button className="flex items-center justify-center gap-2 liquid-glass rounded-full px-4 py-2 text-sm flex-1">
                <Search size={18} />
                <span>Search</span>
              </button>
              <button className="flex items-center justify-center liquid-glass w-10 h-10 rounded-full flex-shrink-0">
                <User size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* ── HERO CONTENT ─────────────────────────────────────────────── */}
        {/*
         * flex-1 + justify-end pushes the block to the viewport bottom,
         * sitting just above the blurred region.
         */}
        <div className="flex-1 flex flex-col justify-end px-4 sm:px-6 md:px-12 pb-8 md:pb-16">
          <div className="flex flex-col md:flex-row items-end gap-8">

            {/* Left — metadata + title + description + CTAs */}
            <div className="flex-1">

              {/* Metadata row — delay 300 ms */}
              <Reveal
                delay={300}
                className="flex flex-wrap items-center gap-3 sm:gap-6 mb-6 md:mb-8 text-xs sm:text-sm"
              >
                <span className="flex items-center gap-1.5">
                  <Star size={16} className="sm:w-5 sm:h-5 fill-white stroke-white" />
                  <span className="font-medium">8.7/10 IMDB</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                  <span>132 min</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar size={16} className="sm:w-5 sm:h-5" />
                  <span>April, 2025</span>
                </span>
              </Reveal>

              {/* Title — delay 400 ms */}
              <Reveal delay={400}>
                <h1
                  className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 md:mb-6"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  Step Through.<br />
                  Work Smarter.
                </h1>
              </Reveal>

              {/* Description — delay 500 ms */}
              <Reveal delay={500}>
                <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-6 md:mb-12 max-w-2xl">
                  A voyage through forgotten realms, where past and future intertwine.
                </p>
              </Reveal>

              {/* CTA buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">

                {/* Watch Now — solid white, delay 600 ms */}
                <Reveal delay={600} className="contents">
                  <button className="flex items-center gap-2 bg-white text-black rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 hover:bg-gray-200 transition-colors duration-200 cursor-pointer">
                    <Play size={18} className="fill-black stroke-black" />
                    Watch Now
                  </button>
                </Reveal>

                {/* Learn More — liquid glass, delay 700 ms */}
                <Reveal delay={700} className="contents">
                  <button className="flex items-center gap-2 liquid-glass rounded-full font-medium px-6 sm:px-8 py-2.5 sm:py-3 cursor-pointer">
                    Learn More
                  </button>
                </Reveal>
              </div>
            </div>

            {/* Right — Previous / Next navigation arrows */}
            <div className="flex gap-3 md:w-auto">

              {/* Previous — delay 800 ms */}
              <Reveal delay={800} className="contents">
                <button className="flex items-center gap-2 liquid-glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 cursor-pointer">
                  <ChevronLeft size={18} />
                  Previous
                </button>
              </Reveal>

              {/* Next — delay 900 ms */}
              <Reveal delay={900} className="contents">
                <button className="flex items-center gap-2 liquid-glass rounded-full px-4 sm:px-6 py-2.5 sm:py-3 cursor-pointer">
                  Next
                  <ChevronRight size={18} />
                </button>
              </Reveal>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
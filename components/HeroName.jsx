'use client';
import { useRef, useEffect } from 'react';
import gsap from 'gsap';

export default function HeroName({ visible }) {
  const wrapRef = useRef(null);

  useEffect(() => {
    if (!visible || !wrapRef.current) return;

    const els = wrapRef.current.querySelectorAll('[data-animate]');
    gsap.fromTo(
      els,
      { y: 80, opacity: 0 },
      {
        y:        0,
        opacity:  1,
        duration: 1.4,
        ease:     'power4.out',
        stagger:  0.14,
        delay:    0.1,
      }
    );
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      ref={wrapRef}
      style={{
        position:       'fixed',
        inset:          0,
        zIndex:         10,
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        justifyContent: 'center',
        pointerEvents:  'none',
        mixBlendMode:   'difference',
        color:          '#FFFFFF',
      }}
    >
      {/* Main name */}
      <h1
        data-animate
        style={{
          fontFamily:    "'Space Grotesk', sans-serif",
          fontSize:      'clamp(100px, 20vw, 340px)',
          fontWeight:    700,
          color:         '#FFFFFF',
          letterSpacing: '-0.055em',
          lineHeight:    0.85,
          textTransform: 'uppercase',
          userSelect:    'none',
          textAlign:     'center',
          opacity:       0,
        }}
      >
        AMMAR
      </h1>

      {/* Subtitle links */}
      <div
        data-animate
        style={{
          display:       'flex',
          gap:           '48px',
          marginTop:     '44px',
          pointerEvents: 'auto',
          opacity:       0,
        }}
      >
        {[
          { label: 'see my work',  href: '#work'                       },
          { label: 'get in touch', href: 'mailto:amarnfl238@gmail.com' },
        ].map(({ label, href }) => (
          <a
            key={label}
            href={href}
            style={{
              fontFamily:    "'Space Grotesk', sans-serif",
              fontSize:      '0.65rem',
              fontWeight:    400,
              letterSpacing: '0.14em',
              textTransform: 'lowercase',
              color:         '#FFFFFF',
              opacity:       0.38,
              textDecoration:'none',
              transition:    'opacity 0.3s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '1'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '0.38'; }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
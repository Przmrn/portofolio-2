"use client";
import { useState, useEffect } from "react";


export default function BackToTopCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling down 500px
      setIsVisible(window.scrollY > 500);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            right: "32px",
            zIndex: 100,
          }}
        >
          <button
            onClick={scrollToTop}
            className="pill-lime"
            style={{
              padding: "16px 24px",
              border: "none",
              cursor: "pointer",
              boxShadow: "var(--shadow-cta)",
            }}
          >
            <span className="button-text" style={{ color: "var(--obsidian)" }}>
              ↑ BACK TO TOP
            </span>
          </button>
        </div>
      )}
    </>
  );
}

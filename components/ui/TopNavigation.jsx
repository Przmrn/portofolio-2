"use client";

import {useEffect, useState} from "react";
import {scrollToId, startScroll, stopScroll} from "./scroll";

const LINKS = [
    {label: "Work", target: "work"},
    {label: "Manifesto", target: "manifesto"},
    {label: "Stack", target: "stack"},
    {label: "Contact", target: "contact"},
];

/* Fixed transparent 66px header — logo left, locale center, menu right.
   The ink inverts per background band (paper over hero/stack/footer,
   obsidian over paper bands) with a smooth monopo crossfade and no
   background fill. Underline-free text links only. */
const DARK_BANDS = new Set(["stack", "footer"]);

export default function TopNavigation() {
  const [overDark, setOverDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const line = 33; // header midline
      const bands = document.querySelectorAll("main section[id], footer");
      let dark = true;
      bands.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top <= line && r.bottom >= line) {
          dark = DARK_BANDS.has(el.id) || el.tagName === "FOOTER";
        }
      });
      setOverDark(dark);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

    useEffect(() => {
        if (open) stopScroll();
        else startScroll();
        document.body.style.overflow = open ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    const go = (id) => {
        setOpen(false);
        /* Let the overlay close (and Lenis resume) before gliding. */
        requestAnimationFrame(() => requestAnimationFrame(() => scrollToId(id)));
    };

    return (
        <>
            <header className={`monopo-nav ${overDark || open ? "monopo-nav--over-dark" : "monopo-nav--over-light"}`}>
                <div className="monopo-container monopo-nav__inner">
                    <button className="monopo-nav__wordmark" onClick={() => go("top")} aria-label="Back to top">
                        A // M
                    </button>

                    <div className="monopo-nav__locale" aria-label="Language">
                        <button className="link-quiet link-quiet--micro" style={{opacity: 1}} aria-current="true">
                            EN
                        </button>
                        <button className="link-quiet link-quiet--micro" style={{opacity: 0.45}}>
                            ID
                        </button>
                    </div>

                    <nav className="monopo-nav__menu monopo-nav__menu--desktop" aria-label="Primary">
                        {LINKS.map((l) => (
                            <button key={l.target} className="link-quiet" onClick={() => go(l.target)}>
                                {l.label}
                            </button>
                        ))}
                    </nav>

                    <button className="monopo-menu-btn" onClick={() => setOpen(true)} aria-label="Open menu">
                        Menu
                    </button>
                </div>
            </header>

            <div className="monopo-overlay" data-open={open ? "true" : "false"} role="dialog" aria-hidden={!open}>
                <button
                    className="link-quiet"
                    style={{color: "#fff", alignSelf: "flex-end", marginBottom: 24}}
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                >
                    Close
                </button>
                {[{label: "Top", target: "top"}, ...LINKS].map((l) => (
                    <button key={l.target} className="monopo-overlay__link" onClick={() => go(l.target)}>
                        {l.label}
                    </button>
                ))}
                <p className="text-micro" style={{color: "#8f8f8f", marginTop: 32}}>
                    Banda Aceh, Indonesia — 5.5501° N, 95.3222° E
                </p>
            </div>
        </>
    );
}

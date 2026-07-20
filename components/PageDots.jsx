"use client";

import { usePageContext } from "./FullPageScroll";

const PAGE_LABELS = ["HERO", "WORK", "ABOUT", "CONTACT"];

export default function PageDots() {
  const { current, total, goTo } = usePageContext();

  return (
    <nav className="page-dots" aria-label="Page navigation">
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          className={`page-dots__dot${i === current ? " page-dots__dot--active" : ""}`}
          onClick={() => goTo(i)}
          aria-label={`Go to ${PAGE_LABELS[i] || `page ${i + 1}`}`}
          aria-current={i === current ? "true" : undefined}
        >
          <span className="page-dots__line" />
          <span className="page-dots__label label-mono--xs">
            {PAGE_LABELS[i] || `0${i + 1}`}
          </span>
        </button>
      ))}
    </nav>
  );
}

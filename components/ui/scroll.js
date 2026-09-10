/* Shared Lenis singleton + scroll helpers.
   SmoothScroll.jsx owns the instance; navigation components
   consume scrollToId() so every jump glides at monopo tempo. */

let lenisInstance = null;

export function setLenis(instance) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function stopScroll() {
  lenisInstance?.stop();
}

export function startScroll() {
  lenisInstance?.start();
}

export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  if (lenisInstance) {
    lenisInstance.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

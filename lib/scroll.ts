"use client";

import type Lenis from "lenis";

let lenis: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenis = instance;
}

export function getLenis() {
  return lenis;
}

export function scrollToId(id: string) {
  const el = id === "home" ? 0 : document.getElementById(id);
  if (el === null) return;
  if (lenis) {
    lenis.scrollTo(el as HTMLElement | number, { offset: 0, duration: 1.4 });
  } else if (el === 0) {
    window.scrollTo({ top: 0 });
  } else {
    el.scrollIntoView();
  }
  if (id !== "home") history.replaceState(null, "", `#${id}`);
  else history.replaceState(null, "", window.location.pathname);
}

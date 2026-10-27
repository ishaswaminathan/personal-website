"use client";

import { useEffect, useLayoutEffect, useState } from "react";

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function useMediaQuery(query: string, initial = false) {
  const [matches, setMatches] = useState(initial);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setMatches(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return matches;
}

/** Resolves once the intro overlay has finished (or immediately if it was skipped). */
export function useIntroDone() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (window.__introDone) return setDone(true);
    const on = () => setDone(true);
    window.addEventListener("intro:done", on, { once: true });
    return () => window.removeEventListener("intro:done", on);
  }, []);
  return done;
}

declare global {
  interface Window {
    __introDone?: boolean;
  }
}

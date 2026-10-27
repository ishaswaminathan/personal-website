"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { fullName } from "@/content/site";
import Cutout from "./Cutout";

/**
 * First-visit intro: geometric mark draws itself → name assembles letter by letter →
 * a gradient line sweeps across → the overlay lifts to reveal the hero.
 * Skipped for returning visitors (per session) and for reduced-motion users.
 */
export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const finish = () => {
      window.__introDone = true;
      window.dispatchEvent(new Event("intro:done"));
      try { sessionStorage.setItem("intro-seen", "1"); } catch {}
      getLenis()?.start();
      setGone(true);
    };

    if (document.documentElement.classList.contains("intro-skip")) {
      setGone(true);
      window.dispatchEvent(new Event("intro:done"));
      return;
    }

    getLenis()?.stop();
    const ctx = gsap.context(() => {
      const t = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: finish });
      t.fromTo(".intro-mark path", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: "power2.inOut" })
        .to(".intro-count", { innerText: 100, duration: 1, snap: { innerText: 1 }, ease: "power2.inOut" }, 0)
        .to(".intro-mark", { scale: 0.6, opacity: 0, duration: 0.5, ease: "power2.in" }, 1.05)
        // Paper letters drop onto the page one by one and settle at their tilt
        .fromTo(
          ".intro .cut-tile",
          { y: -90, rotate: (i: number) => (i % 2 ? 28 : -28), scale: 0.7, opacity: 0 },
          { y: 0, rotate: 0, scale: 1, opacity: 1, duration: 0.8, stagger: 0.05, ease: "back.out(1.7)" },
          1.15,
        )
        .fromTo(".intro-sweep", { scaleX: 0, transformOrigin: "0% 50%" }, { scaleX: 1, duration: 0.8, ease: "expo.inOut" }, 1.9)
        .to(".intro-sweep", { scaleX: 0, transformOrigin: "100% 50%", duration: 0.6, ease: "expo.inOut" }, 2.65)
        .to(".intro .cut-tile", { y: -60, opacity: 0, duration: 0.5, stagger: 0.02, ease: "power3.in" }, 2.6)
        .to(root.current, { clipPath: "inset(0 0 100% 0)", duration: 1, ease: "expo.inOut" }, 3.05)
        .add(() => {
          // Hero animations start slightly before the overlay fully clears
          window.__introDone = true;
          window.dispatchEvent(new Event("intro:done"));
        }, 3.25);
      tl.current = t;
    }, root);
    return () => ctx.revert();
  }, []);

  const skip = () => tl.current?.progress(1);

  if (gone) return null;

  const words = fullName.split(" ");

  return (
    <div
      ref={root}
      role="presentation"
      className="intro fixed inset-0 z-[180] flex items-center justify-center bg-ink"
      style={{ clipPath: "inset(0 0 0% 0)" }}
    >
      <style>{`html.intro-skip .intro{display:none}`}</style>
      <svg
        className="intro-mark absolute h-16 w-16"
        viewBox="0 0 64 64"
        fill="none"
        stroke="url(#ig)"
        strokeWidth="1.2"
        aria-hidden
      >
        <defs>
          <linearGradient id="ig" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop stopColor="#5b7a3a" />
            <stop offset="0.5" stopColor="#9cae81" />
            <stop offset="1" stopColor="#d4a23c" />
          </linearGradient>
        </defs>
        <path pathLength={1} strokeDasharray="1" d="M32 4 60 32 32 60 4 32Z" />
        <path pathLength={1} strokeDasharray="1" d="M32 16 48 32 32 48 16 32Z" />
        <path pathLength={1} strokeDasharray="1" d="M4 32h56M32 4v56" />
      </svg>

      <div style={{ transform: "scaleX(0)" }} className="intro-sweep absolute inset-x-0 top-1/2 h-px origin-left bg-gradient-to-r from-electric via-lavender to-cyan shadow-[0_0_24px_2px_rgba(212,162,60,0.55)]" />

      <h2 className="sr-only">{fullName}</h2>
      <div className="relative z-10 flex flex-col items-center gap-[0.12em] px-4 text-[clamp(2.4rem,8vw,7rem)] uppercase">
        {words.map((w, wi) => (
          <Cutout key={wi} text={w} seed={wi + 3} animate="none" label={false} />
        ))}
      </div>
      <style>{`.intro .cut-tile{opacity:0}`}</style>

      <div className="absolute bottom-8 left-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 sm:left-10">
        Loading <span className="intro-count tabular-nums text-white/70">0</span>%
      </div>
      <button
        onClick={skip}
        className="absolute bottom-6 right-6 rounded-full border border-white/15 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors hover:border-white/40 hover:text-white sm:right-10"
      >
        Skip intro
      </button>
    </div>
  );
}

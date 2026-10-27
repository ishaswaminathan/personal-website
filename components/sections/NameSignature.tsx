"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ArrowUpRight } from "lucide-react";
import { site, fullName } from "@/content/site";
import Cutout from "@/components/ui/Cutout";

const STONES = 28;

/**
 * Line of "stepping stones": a solid rule with evenly spaced dots. One stone at
 * a time hops up and turns honey, so a gentle wave walks across the line.
 */
function Rule({ reverse = false }: { reverse?: boolean }) {
  return (
    <div aria-hidden className="px-4 py-7 sm:px-8">
      <div className="relative mx-auto flex max-w-[96rem] items-center justify-between">
        <span className="absolute inset-x-0 top-1/2 h-[2px] -translate-y-1/2 rounded-full bg-white/25" />
        {Array.from({ length: STONES }, (_, i) => (
          <span
            key={i}
            className="stone relative h-2.5 w-2.5 rounded-full border-2 border-ink bg-white/45 max-sm:[&:nth-child(odd)]:hidden"
            style={{ ["--i" as string]: reverse ? STONES - 1 - i : i }}
          />
        ))}
      </div>
    </div>
  );
}

/** Circular "Connect on LinkedIn" badge that spins very slowly */
function Badge() {
  const text = "Connect on LinkedIn • Say hi • ";
  return (
    <a
      href={site.contact.linkedin}
      target="_blank"
      rel="noopener"
      aria-label="Connect with me on LinkedIn"
      className="sig-badge group relative block h-28 w-28 sm:h-36 sm:w-36"
    >
      <svg
        viewBox="0 0 100 100"
        aria-hidden
        className="h-full w-full animate-[spin_45s_linear_infinite]"
      >
        <defs>
          <path id="circ" d="M50 50m-38 0a38 38 0 1 1 76 0a38 38 0 1 1-76 0" />
        </defs>
        {/* textLength fits the phrase exactly once around the circle */}
        <text className="fill-white/70 font-mono text-[8.6px] uppercase" textLength={236} lengthAdjust="spacing">
          <textPath href="#circ" textLength={236} lengthAdjust="spacing">
            {text.toUpperCase()}
          </textPath>
        </text>
      </svg>
      <span
        aria-hidden
        className="absolute inset-0 m-auto grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-butter via-cyan to-electric text-ink shadow-[0_0_30px_rgba(212,162,60,0.45)] transition-transform duration-500 group-hover:scale-110"
      >
        <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
      </span>
    </a>
  );
}

/**
 * Signature moment: the name as cut-out paper letters. On scroll the tiles
 * fly in from scattered positions, settle into place, a warm light passes
 * through them, and the tagline appears.
 */
export default function NameSignature() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      const tiles = gsap.utils.toArray<HTMLElement>(".sig-name .cut-tile");

      const build = (scrub: boolean | number, pin: boolean) => {
        const tl = gsap.timeline({
          scrollTrigger: scrub
            ? { trigger: ".sig-stage", start: "top top", end: "+=160%", scrub, pin: true, anticipatePin: 1 }
            : { trigger: ".sig-stage", start: "top 70%" },
        });
        tl.fromTo(".sig-line", { scaleX: 0 }, { scaleX: 1, duration: 1, ease: "power3.inOut" })
          .fromTo(
            tiles,
            {
              x: (i: number) => Number(tiles[i].dataset.x),
              y: (i: number) => Number(tiles[i].dataset.y),
              rotate: (i: number) => Number(tiles[i].dataset.r),
              scale: 0.7,
              opacity: 0,
            },
            { x: 0, y: 0, rotate: 0, scale: 1, opacity: 1, duration: 1.6, stagger: 0.06, ease: "back.out(1.4)" },
            0.4,
          )
          .fromTo(".sig-glow", { xPercent: -120, opacity: 0 }, { xPercent: 220, opacity: 1, duration: 1.6, ease: "power1.inOut" }, 2.1)
          .fromTo(".sig-sub", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.12, ease: "expo.out" }, 2.6)
          .fromTo(".sig-badge", { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 2.5);
        if (pin) tl.to(".sig-name", { scale: 0.92, yPercent: -5, duration: 1, ease: "none" }, "+=0.4");
      };

      mm.add("(min-width: 768px) and (prefers-reduced-motion: no-preference)", () => build(1, true));
      mm.add("(max-width: 767px) and (prefers-reduced-motion: no-preference)", () => build(false, false));
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="signature" aria-label={`${fullName}: signature`} className="relative bg-ink">
      <div className="sig-stage relative flex flex-col md:min-h-[100svh] justify-between overflow-clip">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="orb left-1/4 top-1/3 h-[30rem] w-[30rem] bg-butter/40" />
        <Rule />

        <div className="relative flex flex-1 flex-col justify-center px-4 py-10 sm:px-8 md:py-0">
          <div className="sig-line mx-auto mb-10 h-[2px] w-full max-w-[96rem] origin-center rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <h2 className="sig-name relative mx-auto w-full max-w-[96rem] select-none uppercase">
            <span className="sr-only">{fullName}</span>
            <span aria-hidden className="block whitespace-nowrap text-[clamp(3.2rem,14vw,15rem)]">
              <Cutout text={site.name.first} seed={7} animate="none" label={false} />
            </span>
            <span aria-hidden className="mt-[0.06em] block whitespace-nowrap text-right text-[clamp(1.5rem,7.3vw,9.5rem)]">
              <Cutout text={site.name.last} seed={11} animate="none" label={false} />
            </span>
            {/* Warm light passing over the paper */}
            <span
              aria-hidden
              className="sig-glow pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-butter/50 to-transparent opacity-0 mix-blend-soft-light blur-2xl"
            />
          </h2>

          <div className="mx-auto mt-12 flex w-full max-w-[96rem] flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
            <Badge />
            <p className="max-w-md text-left text-xl sm:text-right leading-snug text-white/70 sm:text-2xl">
              {site.signatureTagline.split(". ").map((s, i, arr) => (
                <span key={i} className="sig-sub block">
                  {i === 1 ? <em className="font-serif text-[1.15em] text-lavender">{s}.</em> : `${s}${i < arr.length - 1 ? "." : ""}`}
                </span>
              ))}
            </p>
          </div>
        </div>

        <Rule reverse />
      </div>
    </section>
  );
}

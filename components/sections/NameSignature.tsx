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

/** Signature moment: the name as cut-out paper letters, with the tagline and LinkedIn badge. */
export default function NameSignature() {
  const root = useRef<HTMLElement>(null);

  // No pinning or fly-in: the name is simply there, and gently shrinks as you scroll past
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".sig-name",
          { scale: 1 },
          {
            scale: 0.8,
            transformOrigin: "50% 50%",
            ease: "none",
            scrollTrigger: { trigger: ".sig-stage", start: "top 35%", end: "bottom top", scrub: true },
          },
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="signature" aria-label={`${fullName}: signature`} className="relative bg-ink">
      <div className="sig-stage relative flex flex-col justify-between overflow-clip">
        <div className="absolute inset-0 bg-grid opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]" />
        <div className="orb left-1/4 top-1/3 h-[30rem] w-[30rem] bg-butter/40" />
        <Rule />

        <div className="relative flex flex-1 flex-col justify-center px-4 py-12 sm:px-8 md:py-20">
          <div className="sig-line mx-auto mb-10 h-[2px] w-full max-w-[96rem] origin-center rounded-full bg-gradient-to-r from-transparent via-white/50 to-transparent" />

          <h2 className="sig-name relative mx-auto w-full max-w-[96rem] select-none uppercase">
            <span className="sr-only">{fullName}</span>
            <span aria-hidden className="block whitespace-nowrap text-[clamp(3.2rem,14vw,15rem)]">
              <Cutout text={site.name.first} seed={7} animate="none" label={false} />
            </span>
            <span aria-hidden className="mt-[0.06em] block whitespace-nowrap text-right text-[clamp(1.5rem,7.3vw,9.5rem)]">
              <Cutout text={site.name.last} seed={11} animate="none" label={false} />
            </span>
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

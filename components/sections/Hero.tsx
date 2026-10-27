"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion, useIntroDone } from "@/lib/hooks";
import { scrollToId } from "@/lib/scroll";
import { site, education } from "@/content/site";
import Magnetic from "@/components/ui/Magnetic";

const HeroField = dynamic(() => import("@/components/visuals/HeroField"), { ssr: false });

function RoleCycler() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setI((n) => (n + 1) % site.roles.length), 2400);
    return () => window.clearInterval(id);
  }, []);
  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom" aria-live="polite">
      {/* Invisible copy of the longest role reserves enough width so nothing gets clipped */}
      <span aria-hidden className="invisible whitespace-nowrap">
        {site.roles.reduce((a, b) => (b.length > a.length ? b : a))}
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={site.roles[i]}
          initial={{ y: "100%", opacity: 0, filter: "blur(6px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="absolute left-0 whitespace-nowrap text-white"
        >
          {site.roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const introDone = useIntroDone();

  // Entrance, once the intro clears
  useEffect(() => {
    if (!introDone) return;
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set([".hw", ".hero-fade", ".hero-bg"], { opacity: 1 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
      tl.fromTo(".hw", { yPercent: 115, rotate: 4, opacity: 1 }, { yPercent: 0, rotate: 0, duration: 1.4, stagger: 0.06 })
        .fromTo(".hero-fade", { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 1.2, stagger: 0.08 }, 0.5)
        .fromTo(".hero-bg", { opacity: 0, scale: 1.08 }, { opacity: 1, scale: 1, duration: 2.4, ease: "power2.out" }, 0);
    }, root);
    return () => ctx.revert();
  }, [introDone]);

  // Scroll parallax: copy drifts up and fades as the field recedes
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(".hero-copy", {
          yPercent: -18,
          opacity: 0.15,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
        gsap.to(".hero-bg", {
          yPercent: 20,
          ease: "none",
          scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const words = site.headline.split(" ");

  return (
    <section ref={root} id="home" className="relative flex min-h-[100svh] flex-col overflow-clip" aria-label="Introduction">
      {/* Background */}
      <div className="hero-bg absolute inset-0 opacity-0">
        <div className="orb animate-drift -left-[10%] top-[8%] h-[38vw] w-[38vw] bg-electric/25" />
        <div className="orb animate-drift right-[-8%] top-[30%] h-[32vw] w-[32vw] bg-violet/25 [animation-delay:-6s]" />
        <HeroField />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,transparent_0%,rgba(245,239,227,0.5)_55%,#f5efe3_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <div className="hero-copy relative z-10 mx-auto flex w-full max-w-[90rem] flex-1 flex-col justify-end px-5 pb-28 pt-32 sm:px-10 sm:pb-24">
        {/* Meta row */}
        <div className="hero-fade mb-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.18em] text-white/50 opacity-0">
          <span className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            {site.availability}
          </span>
          <span className="hidden sm:inline">{education.school} · {education.degree.replace("B.S. in ", "")}</span>
          <span>{site.location}</span>
        </div>

        <h1 className="max-w-[16ch] text-[clamp(2.9rem,8.6vw,9.4rem)] font-semibold leading-[0.9] tracking-[-0.045em] text-white">
          {words.map((w, i) => {
            const accent = site.headlineAccents.includes(w);
            return (
              <span key={i} className="mr-[0.22em] inline-flex overflow-hidden pb-[0.1em] align-top">
                <span className={`hw inline-block opacity-0 ${accent ? "text-gradient" : ""} ${w === "Design," ? "font-serif font-normal italic tracking-[-0.02em]" : ""}`}>
                  {w}
                </span>
              </span>
            );
          })}
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-xl">
            <div className="hero-fade space-y-4 text-lg leading-relaxed text-white/65 opacity-0">
              {site.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <p className="hero-fade mt-6 flex items-center gap-3 text-lg text-white/40 opacity-0">
              <span className="h-px w-8 bg-white/30" />
              <RoleCycler />
            </p>
          </div>

          <div className="hero-fade flex flex-wrap gap-3 opacity-0">
            <Magnetic>
              <button
                onClick={() => scrollToId("projects")}
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-white py-4 pl-7 pr-5 text-[15px] font-medium text-ink"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-cyan to-butter transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-0" />
                <span className="relative transition-colors group-hover:text-white">Explore My Work</span>
                <span className="relative grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-[-45deg]">
                  <ArrowDownRight className="h-4 w-4" />
                </span>
              </button>
            </Magnetic>
            <Magnetic>
              <a
                href={site.contact.linkedin}
                target="_blank"
                rel="noopener"
                className="ring-anim group inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/[0.03] py-4 pl-7 pr-5 text-[15px] font-medium text-white backdrop-blur"
              >
                Connect on LinkedIn
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => scrollToId("signature")}
        className="hero-fade absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 opacity-0"
        aria-label="Scroll to next section"
      >
        <span className="relative h-9 w-[22px] rounded-full border border-white/30">
          <span className="absolute left-1/2 top-1.5 h-1.5 w-1 -translate-x-1/2 rounded-full bg-white" style={{ animation: "scroll-dot 1.8s ease-in-out infinite" }} />
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">Scroll</span>
      </button>
    </section>
  );
}

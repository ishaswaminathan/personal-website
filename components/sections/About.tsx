"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { about, education, site, fullName } from "@/content/site";
import { Eyebrow, RevealWords, ScrubText } from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

const cardPos = [
  "lg:left-[-14%] lg:top-[8%]",
  "lg:right-[-12%] lg:top-[22%]",
  "lg:left-[-8%] lg:bottom-[16%]",
  "lg:right-[-16%] lg:bottom-[4%]",
];
const glyphs = ["∑", "◇", "↗", "</>"];

function PillarCard({ title, blurb, index }: { title: string; blurb: string; index: number }) {
  const [open, setOpen] = useState(false);
  return (
    <button
      type="button"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
      onClick={() => setOpen((o) => !o)}
      aria-expanded={open}
      className={`pillar glass ring-anim group relative z-10 w-full rounded-2xl p-5 text-left shadow-[0_20px_50px_-24px_rgba(80,64,24,0.35)] transition-[width,background-color] duration-500 lg:absolute lg:w-56 ${cardPos[index]} ${
        open ? "bg-white/[0.1] lg:w-72" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold tracking-tight text-white">{title}.</span>
        <span className="font-mono text-sm text-lavender/80">{glyphs[index]}</span>
      </div>
      <div className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
        <p className="overflow-hidden pt-3 text-sm leading-relaxed text-white/65">{blurb}</p>
      </div>
      {!open && (
        <span className="mt-2 block font-mono text-[10px] uppercase tracking-[0.2em] text-white/30">
          <span className="[@media(hover:hover)]:hidden">Tap to explore</span>
          <span className="hidden [@media(hover:hover)]:inline">Hover to explore</span>
        </span>
      )}
    </button>
  );
}

export default function About() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      // Headshot pops up out of the page in 3D as it scrolls into view
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".about-photo-pop",
          { y: 140, rotateX: 28, rotateZ: -4, scale: 0.82, opacity: 0, transformPerspective: 1200, transformOrigin: "50% 100%" },
          {
            y: 0, rotateX: 0, rotateZ: 0, scale: 1, opacity: 1, duration: 1.4, ease: "back.out(1.4)",
            scrollTrigger: { trigger: ".about-visual", start: "top 80%" },
          },
        );
        gsap.fromTo(".about-photo-back", { rotate: 0, opacity: 0 }, {
          rotate: 5, opacity: 1, duration: 1.2, delay: 0.35, ease: "expo.out",
          scrollTrigger: { trigger: ".about-visual", start: "top 80%" },
        });
      });
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".pillar").forEach((el, i) => {
          gsap.fromTo(el, { y: 60 + i * 30, opacity: 0 }, {
            y: -20 - i * 15, opacity: 1, ease: "none",
            scrollTrigger: { trigger: ".about-visual", start: "top 85%", end: "bottom 30%", scrub: true },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="about" className="relative overflow-clip bg-ink py-32 sm:py-44">
      <div className="orb -right-40 top-40 h-[40rem] w-[40rem] bg-violet/10" />
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-10">
        <Eyebrow index="01" label="About" />

        <RevealWords
          text={about.headline.join(" ")}
          className="max-w-[14ch] text-[clamp(2.8rem,7.5vw,7.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white"
          wordClassName={(w) => (w === "Data" ? "font-serif font-normal italic text-gradient tracking-[-0.02em]" : w === "Curiosity" ? "text-gradient" : "")}
        />

        <div className="mt-20 grid gap-20 lg:grid-cols-[1.1fr_1fr] lg:gap-28">
          {/* Story */}
          <div className="space-y-10">
            {about.story.map((p, i) => (
              <ScrubText key={i} text={p} className="text-2xl leading-[1.45] tracking-[-0.01em] text-white sm:text-[1.85rem]" />
            ))}

            <div className="glass mt-14 grid gap-5 rounded-3xl p-6 sm:p-7 sm:grid-cols-[auto_1fr] sm:items-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-[#c41230] to-[#7a0b1e] font-serif text-2xl italic text-[#fffdf7]">
                C
              </div>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Currently</p>
                <p className="mt-1 text-lg text-white">{education.school}</p>
                <p className="text-[15px] text-white/55">
                  <span className="whitespace-nowrap">{education.degree}</span>
                  {" · "}
                  <span className="whitespace-nowrap">Concentration in {education.concentration}</span>
                </p>
                <p className="text-[15px] text-white/55">Class of {education.gradYear}</p>
                <a
                  href={education.programUrl}
                  target="_blank"
                  rel="noopener"
                  className="group mt-1 inline-flex items-center gap-1.5 py-2 text-sm font-medium text-electric"
                >
                  <span className="u-link pb-0.5">About the Information Systems program</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </div>
            </div>
          </div>

          {/* Visual: portrait + floating interest cards */}
          <div className="about-visual relative mx-auto w-full max-w-md lg:mt-10">
            <div className="relative" style={{ perspective: 1200 }}>
              {/* Paper tile behind the photo for a layered, 3D feel */}
              <div className="about-photo-back absolute inset-0 rounded-[2rem] bg-sage/70 shadow-[0_30px_60px_-30px_rgba(80,64,24,0.5)]" />
              <div className="about-photo-pop relative">
                <TiltCard max={8} className="overflow-hidden rounded-[2rem] shadow-[0_40px_80px_-30px_rgba(60,48,16,0.55),0_8px_20px_-8px_rgba(60,48,16,0.3)] ring-4 ring-[#fffdf7]">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src={site.portrait}
                      alt={`Portrait of ${fullName}`}
                      fill
                      quality={95}
                      sizes="(min-width: 1024px) 36rem, 95vw"
                      className="object-cover object-[60%_center]"
                    />
                    <span className="absolute bottom-4 left-4 rounded-full bg-[#fffdf7]/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
                      {site.location}
                    </span>
                  </div>
                </TiltCard>
              </div>
            </div>
            <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-gradient-to-br from-butter/40 via-transparent to-sage/40 blur-3xl" />

            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-0 lg:block">
              {about.pillars.map((p, i) => (
                <PillarCard key={p.title} {...p} index={i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

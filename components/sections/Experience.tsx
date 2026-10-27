"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { experience } from "@/content/site";
import { Eyebrow, RevealWords } from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".tl-progress", { scaleY: 0 }, {
          scaleY: 1, ease: "none",
          scrollTrigger: { trigger: ".tl", start: "top 60%", end: "bottom 60%", scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".tl-item").forEach((el) => {
          const left = el.dataset.side === "left";
          gsap.fromTo(el.querySelector(".tl-card"), { opacity: 0, x: left ? -60 : 60, y: 40 }, {
            opacity: 1, x: 0, y: 0, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 80%" },
          });
          gsap.fromTo(el.querySelector(".tl-node"), { scale: 0 }, {
            scale: 1, duration: 0.6, ease: "back.out(2)",
            scrollTrigger: { trigger: el, start: "top 60%" },
          });
          gsap.fromTo(el.querySelectorAll(".tl-li"), { opacity: 0, y: 14 }, {
            opacity: 1, y: 0, duration: 0.8, stagger: 0.08, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 70%" },
          });
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="experience" className="relative bg-ink-2 py-32 sm:py-44">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-10">
        <Eyebrow index="02" label="Experience" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <RevealWords
            text="Where I've been building."
            className="text-[clamp(2.6rem,6.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white"
            wordClassName={(w) => (w === "building." ? "font-serif font-normal italic text-gradient" : "")}
          />
          <p className="max-w-md text-lg leading-relaxed text-white/55 lg:justify-self-end">
            Product analytics, data operations, research, and mentorship: each role taught me something different about turning information into impact!
          </p>
        </div>

        <div className="tl relative mt-24">
          {/* Spine */}
          <div className="absolute bottom-0 left-4 top-0 w-px bg-white/10 lg:left-1/2" aria-hidden />
          <div
            className="tl-progress absolute bottom-0 left-4 top-0 w-px origin-top bg-gradient-to-b from-cyan via-electric to-violet shadow-[0_0_16px_2px_rgba(212,162,60,0.5)] lg:left-1/2"
            aria-hidden
          />

          <ol className="relative">
          {experience.map((job, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <li key={job.role + job.org} data-side={side} className="tl-item relative grid pb-20 pl-14 last:pb-0 lg:grid-cols-2 lg:pl-0">
                <span className="tl-node absolute left-4 top-8 z-10 -ml-[7px] h-[15px] w-[15px] rounded-full border-2 border-ink-2 bg-gradient-to-br from-cyan to-violet shadow-[0_0_0_6px_rgba(156,174,129,0.25),0_0_16px_rgba(212,162,60,0.6)] lg:left-1/2" aria-hidden />

                {/* Date column (opposite side on desktop) */}
                <div className={`mb-4 hidden lg:flex lg:items-start lg:pt-6 ${side === "left" ? "lg:order-2 lg:pl-16" : "lg:justify-end lg:pr-16"}`}>
                  <div className={side === "left" ? "" : "text-right"}>
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-white/40">{job.dates}</p>
                    <p className="mt-2 text-[clamp(3rem,6vw,5.5rem)] font-semibold leading-none tracking-tighter text-white/[0.06]">
                      {String(i + 1).padStart(2, "0")}
                    </p>
                  </div>
                </div>

                <div className={`tl-card ${side === "left" ? "lg:order-1 lg:pr-16" : "lg:order-2 lg:pl-16"}`}>
                  <TiltCard className="ring-anim glass overflow-hidden rounded-3xl" max={5}>
                    <article className="relative p-7 sm:p-9">
                      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-lavender/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <div className="flex flex-wrap items-center gap-3">
                        <span className={`rounded-full px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] ${job.kind === "Research" ? "bg-cyan/15 text-lavender" : "bg-electric/15 text-electric"}`}>
                          {job.kind}
                        </span>
                        <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40 lg:hidden">{job.dates}</span>
                      </div>
                      <h3 className="mt-5 text-2xl font-semibold tracking-tight text-white sm:text-3xl">{job.role}</h3>
                      <p className="mt-1 text-white/70">
                        {job.org}
                        {job.team && <span className="text-white/40"> · {job.team}</span>}
                      </p>
                      <p className="mt-1 text-sm text-white/35">{job.location}</p>
                      <p className="mt-5 text-[15px] leading-relaxed text-white/60">{job.summary}</p>
                      <ul className="mt-5 space-y-3">
                        {job.achievements.map((a) => (
                          <li key={a} className="tl-li flex gap-3 text-[15px] leading-relaxed text-white/80">
                            <span className="mt-[0.6em] h-1 w-3 shrink-0 rounded-full bg-gradient-to-r from-electric to-lavender" />
                            {a}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap gap-2">
                        {job.skills.map((s) => (
                          <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/55 transition-colors group-hover:border-white/20">
                            {s}
                          </span>
                        ))}
                      </div>
                    </article>
                  </TiltCard>
                </div>
              </li>
            );
          })}
          </ol>
        </div>
      </div>
    </section>
  );
}

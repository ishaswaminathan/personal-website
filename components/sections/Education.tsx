"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowUpRight, Award } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { education, site, fullName } from "@/content/site";
import { Eyebrow, FadeIn, RevealWords } from "@/components/ui/Reveal";

/** Abstract line drawing: arches, columns, and a dome, loosely evoking campus architecture. */
function CampusLines() {
  const arches = [0, 1, 2, 3, 4];
  return (
    <svg viewBox="0 0 600 360" fill="none" className="h-full w-full" aria-hidden>
      <g stroke="currentColor" strokeWidth="1.2" className="campus-lines">
        <path pathLength={1} strokeDasharray="1" d="M20 340H580" />
        <path pathLength={1} strokeDasharray="1" d="M60 340V170H540V340" />
        <path pathLength={1} strokeDasharray="1" d="M40 170H560L540 150H60Z" />
        {arches.map((i) => {
          const x = 100 + i * 90;
          return <path key={i} pathLength={1} strokeDasharray="1" d={`M${x} 340V245a35 35 0 0 1 70 0V340`} />;
        })}
        {arches.map((i) => (
          <path key={`w${i}`} pathLength={1} strokeDasharray="1" d={`M${115 + i * 90} 200h40v26h-40Z`} />
        ))}
        <path pathLength={1} strokeDasharray="1" d="M240 150V110H360V150" />
        <path pathLength={1} strokeDasharray="1" d="M255 110a45 45 0 0 1 90 0" />
        <path pathLength={1} strokeDasharray="1" d="M300 65V40M290 50h20" />
        {[262, 284, 316, 338].map((x) => (
          <path key={x} pathLength={1} strokeDasharray="1" d={`M${x} 150V118`} />
        ))}
      </g>
    </svg>
  );
}

export default function Education() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".campus-lines path", { strokeDashoffset: 1 }, {
          strokeDashoffset: 0, stagger: 0.04, ease: "none",
          scrollTrigger: { trigger: ".campus-wrap", start: "top 85%", end: "bottom 40%", scrub: true },
        });
        gsap.fromTo(".edu-photo", { clipPath: "inset(20% 20% 20% 20% round 2rem)" }, {
          clipPath: "inset(0% 0% 0% 0% round 2rem)", ease: "none",
          scrollTrigger: { trigger: ".edu-photo", start: "top 90%", end: "center 55%", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="education" className="relative overflow-clip bg-paper py-32 text-ink sm:py-44">
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-10">
        <Eyebrow index="07" label="Education" light />

        <div className="grid gap-16 lg:grid-cols-[1.25fr_1fr]">
          <div>
            <RevealWords
              text={education.school}
              className="text-[clamp(2.8rem,7vw,7rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
              wordClassName={(w) => (w === "Mellon" ? "font-serif font-normal italic text-butter" : "")}
            />

            <FadeIn stagger={0.08} className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink/10 bg-ink/10 sm:grid-cols-2">
              {[
                ["Degree", education.degree],
                ["Concentration", education.concentration],
                ["Timeline", `${education.dates} · Class of ${education.gradYear}`],
              ].map(([k, v]) => (
                <div key={k} className="bg-paper p-6 transition-colors hover:bg-ink/5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">{k}</p>
                  <p className="mt-2 text-lg font-medium tracking-tight">{v}</p>
                </div>
              ))}
              <a
                href={education.programUrl}
                target="_blank"
                rel="noopener"
                className="group bg-paper p-6 transition-colors hover:bg-ink/5"
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">Program</p>
                <p className="mt-2 flex items-center gap-2 text-lg font-medium tracking-tight">
                  CMU Information Systems
                  <ArrowUpRight className="h-4 w-4 text-butter transition-transform duration-500 group-hover:rotate-45" />
                </p>
              </a>
            </FadeIn>

            <FadeIn className="mt-6 flex flex-col gap-3">
              {education.honors.map((h) => (
                <p key={h} className="flex items-center gap-3 rounded-2xl bg-ink px-5 py-4 text-paper">
                  <Award className="h-5 w-5 shrink-0 text-lavender" />
                  {h}
                </p>
              ))}
            </FadeIn>

            <div className="mt-14">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">Relevant coursework</h3>
              <FadeIn as="ol" stagger={0.05} y={20} className="mt-5 divide-y divide-ink/10 border-y border-ink/10">
                {education.coursework.map((c, i) => (
                  <li key={c} className="group flex items-baseline gap-5 py-3.5 transition-[padding] duration-500 hover:pl-3">
                    <span className="font-mono text-xs text-ink/35">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-lg tracking-tight transition-colors group-hover:text-butter">{c}</span>
                  </li>
                ))}
              </FadeIn>
            </div>
          </div>

          <div className="flex flex-col gap-10">
            <div className="campus-wrap text-ink/70">
              <CampusLines />
            </div>
            <div className="edu-photo relative aspect-[4/5] overflow-hidden rounded-[2rem]">
              <Image
                src={site.campusPhoto}
                alt={`${fullName} holding a Carnegie Mellon Tartans flag`}
                fill
                sizes="(min-width: 1024px) 36rem, 90vw"
                className="object-cover object-[50%_35%] transition-transform duration-1000 hover:scale-[1.03]"
              />
              <span className="absolute bottom-4 left-4 rounded-full bg-paper/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur">
                Go Tartans!
              </span>
            </div>

            <div>
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">Campus involvement</h3>
              <FadeIn as="ul" stagger={0.06} y={16} className="mt-5 flex flex-wrap gap-2.5">
                {education.organizations.map((o) => (
                  <li
                    key={o.name}
                    className="rounded-full border border-ink/15 px-4 py-2 text-[15px] transition-colors hover:border-ink/40 hover:bg-ink/5"
                  >
                    {o.name}
                    {o.role && <span className="text-ink/55"> · {o.role}</span>}
                  </li>
                ))}
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

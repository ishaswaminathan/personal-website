"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Plus } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { projects, publications, type Project } from "@/content/site";
import { Eyebrow, RevealWords } from "@/components/ui/Reveal";
import TiltCard from "@/components/ui/TiltCard";
import CountUp from "@/components/ui/CountUp";
import ProjectVisual from "@/components/visuals/ProjectVisual";

const ease = [0.16, 1, 0.3, 1] as const;

/** The full story, revealed in place beneath the card (no page change). */
function Details({ p }: { p: Project }) {
  const cs = p.caseStudy;
  const chapters: [string, React.ReactNode][] = [
    ["The Challenge", <p key="c">{cs.challenge}</p>],
    [
      cs.approachTitle ?? "My Approach",
      <ol key="a" className="space-y-4">
        {cs.approach.map((a, i) => (
          <li key={a} className="flex gap-4">
            <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-white/15 font-mono text-[11px] text-white/60">
              {i + 1}
            </span>
            <span>{a}</span>
          </li>
        ))}
      </ol>,
    ],
    [
      "The Solution",
      <div key="s">
        <p>{cs.solution}</p>
        {cs.features && (
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {cs.features.map((f) => (
              <div key={f.title} className="rounded-2xl border border-white/10 bg-ink-3/70 p-5">
                <h4 className="font-semibold tracking-tight text-white">{f.title}</h4>
                <p className="mt-1.5 text-[15px] leading-relaxed text-white/60">{f.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>,
    ],
    ["The Impact", <p key="i">{cs.impact}</p>],
    ...(cs.learned ? [["What I Learned", <p key="l">{cs.learned}</p>] as [string, React.ReactNode]] : []),
  ];

  return (
    <div className="border-t border-white/10 px-6 pb-10 pt-8 sm:px-10">
      {[
        { heading: p.statsHeading, stats: p.stats, tone: "Before" },
        { heading: p.afterHeading, stats: p.afterStats, tone: "After" },
      ].map(({ heading, stats, tone }) => stats && (
        <div key={tone} className="mb-10">
          {heading && (
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/45">
              {p.afterStats && (
                <span className={`rounded-full px-2.5 py-0.5 ${tone === "After" ? "bg-electric text-ink" : "border border-white/20"}`}>{tone}</span>
              )}
              {heading}
            </p>
          )}
          <div className="grid gap-3 sm:grid-cols-3">
            {stats.map((s) => (
              <div key={s.label} className="rounded-2xl border border-white/10 bg-ink-3/70 p-5">
                <CountUp
                  value={s.value}
                  prefix={s.prefix}
                  suffix={s.suffix}
                  decimals={s.decimals}
                  className="block text-[clamp(2.4rem,4vw,3.4rem)] font-semibold tracking-[-0.05em] text-gradient"
                />
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      ))}

      <div className="divide-y divide-white/10">
        {chapters.map(([title, body], i) => (
          <motion.section
            key={title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease }}
            className="grid gap-3 py-7 text-[17px] leading-relaxed text-white/80 lg:grid-cols-[14rem_1fr] lg:gap-10"
          >
            <h3 className="flex items-baseline gap-3 text-lg font-semibold tracking-tight text-white">
              <span className="font-mono text-[11px] text-lavender">0{i + 1}</span>
              {title}
            </h3>
            <div>{body}</div>
          </motion.section>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {[p.link, ...(p.extraLinks ?? [])].map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            target="_blank"
            rel="noopener"
            className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium ${
              i === 0 ? "bg-white text-ink" : "border border-white/15 text-white"
            }`}
          >
            {l.label}
            <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
          </a>
        ))}
      </div>
    </div>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const [open, setOpen] = useState(false);
  // "silent" closes skip the exit animation so we can correct the scroll position in the same frame
  const [silent, setSilent] = useState(false);
  // Whatever is on screen when the panel folds; we keep it exactly where it was
  const anchor = useRef<{ el: Element; top: number } | null>(null);
  const cardRef = useRef<HTMLElement>(null);
  const panelId = `project-${p.slug}`;

  // Once you've scrolled past an open case study, fold it away without the page jumping
  useEffect(() => {
    const el = cardRef.current;
    if (!el || !open) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting || e.boundingClientRect.bottom > 0) return;
      const onScreen = document.elementFromPoint(window.innerWidth / 2, window.innerHeight / 2);
      anchor.current = onScreen ? { el: onScreen, top: onScreen.getBoundingClientRect().top } : null;
      setSilent(true);
      setOpen(false);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [open]);

  // Measure how far the on-screen content actually moved (the browser's own scroll anchoring
  // sometimes corrects it already) and only make up the difference
  useLayoutEffect(() => {
    if (!silent) return;
    const a = anchor.current;
    const delta = a ? a.el.getBoundingClientRect().top - a.top : 0;
    if (Math.abs(delta) > 1) {
      const target = window.scrollY + delta;
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(target, { immediate: true, force: true });
      else window.scrollTo(0, target);
    }
    anchor.current = null;
    ScrollTrigger.refresh();
    setSilent(false);
  }, [silent]);

  // Re-measure scroll-driven sections below once the panel finishes opening/closing
  const onDone = () => ScrollTrigger.refresh();

  return (
    <article ref={cardRef} className="pcard">
      <TiltCard max={open ? 0 : 3} className="ring-anim overflow-hidden rounded-[1.75rem] border border-white/10 bg-ink-3">
        <div className="grid md:grid-cols-[1.15fr_1fr]">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className="relative aspect-[16/10] overflow-hidden text-left md:aspect-auto md:min-h-[22rem]"
          >
            <span className="sr-only">{open ? "Hide" : "Show"} the {p.title} case study</span>
            <ProjectVisual kind={p.visual} accent={p.accent} />
            <span className="absolute left-5 top-5 rounded-full bg-ink/80 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/80 backdrop-blur">
              {String(index + 1).padStart(2, "0")}
              {p.year && ` · ${p.year}`}
            </span>
          </button>

          <div className="relative flex flex-col justify-between gap-8 p-6 sm:p-8">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em]" style={{ color: p.accent }}>
                {p.kicker}
              </p>
              <h3 className="mt-2 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">{p.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">{p.summary}</p>
              <p className="mt-3 text-sm text-white/40">{p.role}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-white/60">
                    {t}
                  </span>
                ))}
              </div>
              {/* Extra resources (e.g. a poster) are reachable without opening the case study */}
              {p.extraLinks && (
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.extraLinks.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener"
                      className="group inline-flex items-center gap-1.5 rounded-full border border-white/20 px-4 py-2 text-sm font-medium text-white transition-colors hover:border-transparent hover:bg-white hover:text-ink"
                    >
                      {l.label}
                      <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-500 group-hover:rotate-45" />
                    </a>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                aria-expanded={open}
                aria-controls={panelId}
                className="group inline-flex items-center gap-2.5 text-sm font-medium text-white"
              >
                <span className="grid h-8 w-8 place-items-center rounded-full border border-white/15 transition-transform duration-500 group-hover:border-white/30">
                  <Plus className={`h-4 w-4 transition-transform duration-500 ${open ? "rotate-45" : ""}`} />
                </span>
                <span className="u-link pb-0.5">{open ? "Close the case study" : "Read the case study"}</span>
              </button>
              {/* The black arrow goes straight to the project itself */}
              <a
                href={p.link.href}
                target="_blank"
                rel="noopener"
                aria-label={p.link.label}
                className="group grid h-14 w-14 shrink-0 place-items-center rounded-full bg-white text-ink shadow-[0_10px_30px_-12px_rgba(39,48,31,0.6)] transition-transform duration-500 hover:scale-110"
              >
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" />
              </a>
            </div>
          </div>
        </div>

        {!silent && (
        <AnimatePresence initial={false} onExitComplete={onDone}>
          {open && (
            <motion.div
              id={panelId}
              key="details"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.7, ease }}
              onAnimationComplete={onDone}
              className="overflow-hidden"
            >
              <div>
                <Details p={p} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        )}
      </TiltCard>
    </article>
  );
}

function Publications() {
  return (
    <div className="mt-24">
      <div className="mb-8 flex items-end justify-between gap-6">
        <h3 className="text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
          Published <em className="font-serif font-normal text-gradient">writing</em>
        </h3>
        <p className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-white/40 sm:block">
          {publications.length} publications
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {publications.map((pub) => (
          <a
            key={pub.href}
            href={pub.href}
            target="_blank"
            rel="noopener"
            className="pcard glass ring-anim group relative flex flex-col justify-between gap-8 rounded-[1.75rem] p-7 sm:p-8"
          >
            {/* Folded-paper corner */}
            <span
              aria-hidden
              className="absolute right-0 top-0 h-12 w-12 rounded-bl-2xl bg-gradient-to-bl from-ink-2 to-sage/50 transition-all duration-500 group-hover:h-16 group-hover:w-16"
            />
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lavender">
                {pub.type} · {pub.date}
              </p>
              <h4 className="mt-4 pr-10 font-serif text-[1.65rem] leading-tight text-white">{pub.title}</h4>
              <p className="mt-4 text-[15px] leading-relaxed text-white/60">{pub.summary}</p>
            </div>
            <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-5">
              <span className="text-sm text-white/45">{pub.venue}</span>
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/15 transition-all duration-500 group-hover:rotate-45 group-hover:border-transparent group-hover:bg-white group-hover:text-ink">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default function Projects() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.utils.toArray<HTMLElement>(".pcard").forEach((el) => {
          gsap.fromTo(el, { opacity: 0, y: 80 }, {
            opacity: 1, y: 0, duration: 1.2, ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 88%" },
          });
        });
        gsap.fromTo(".proj-ghost", { xPercent: 10 }, {
          xPercent: -30, ease: "none",
          scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="projects" className="relative overflow-clip bg-ink py-32 sm:py-44">
      <p aria-hidden className="proj-ghost pointer-events-none absolute left-0 top-24 whitespace-nowrap text-[22vw] font-semibold leading-none tracking-tighter text-white/[0.025]">
        Selected Work — Selected Work
      </p>
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-10">
        <Eyebrow index="03" label={`Work · ${projects.length} projects & ${publications.length} publications`} />
        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
          <RevealWords
            text="Selected work & case studies."
            className="text-[clamp(2.6rem,6.5vw,6.5rem)] font-semibold leading-[0.95] tracking-[-0.045em] text-white"
            wordClassName={(w) => (w === "case" || w === "studies." ? "font-serif font-normal italic text-gradient" : "")}
          />
          <p className="max-w-md text-lg leading-relaxed text-white/55 lg:justify-self-end">
            A few things I've built and researched. Open any project to see the problem I was solving, how I tackled it, and what I took away. The arrow takes you to the real thing!
          </p>
        </div>

        <div className="flex flex-col gap-8">
          {projects.map((p, i) => (
            <ProjectCard key={p.slug} p={p} index={i} />
          ))}
        </div>

        <Publications />
      </div>
    </section>
  );
}

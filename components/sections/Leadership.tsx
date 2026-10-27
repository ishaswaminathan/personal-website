"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, Award } from "lucide-react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { getLenis } from "@/lib/scroll";
import { leadership } from "@/content/site";
import { Eyebrow } from "@/components/ui/Reveal";
import CountUp from "@/components/ui/CountUp";

const glows = ["from-electric/30", "from-cyan/25", "from-violet/30"];

/**
 * Pinned horizontal-scroll gallery on desktop; a vertical stack on smaller screens
 * or with reduced motion.
 */
export default function Leadership() {
  const root = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const trigger = useRef<ScrollTrigger | null>(null);

  // Arrow buttons: scroll the page so the previous/next panel is centered in the pinned row
  const step = (dir: 1 | -1) => {
    const st = trigger.current;
    const el = track.current;
    if (!st || !el) return;
    const current = -Number(gsap.getProperty(el, "x"));
    const max = st.end - st.start;
    const targets = gsap.utils
      .toArray<HTMLElement>(".lead-panel", el)
      .map((p) => gsap.utils.clamp(0, max, p.offsetLeft - (window.innerWidth - p.offsetWidth) / 2));
    const next = dir > 0 ? targets.find((t) => t > current + 20) ?? max : [...targets].reverse().find((t) => t < current - 20) ?? 0;
    const y = st.start + next;
    const lenis = getLenis();
    if (lenis) lenis.scrollTo(y, { duration: 1.2 });
    else window.scrollTo({ top: y, behavior: "smooth" });
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const el = track.current!;
        const distance = () => el.scrollWidth - window.innerWidth;
        const tween = gsap.to(el, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".lead-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
        trigger.current = tween.scrollTrigger ?? null;
        gsap.to(".lead-bar", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".lead-pin", start: "top top", end: () => `+=${distance()}`, scrub: true },
        });
        gsap.utils.toArray<HTMLElement>(".lead-panel").forEach((panel) => {
          if (!panel.querySelector(".lead-num")) return;
          gsap.fromTo(panel.querySelector(".lead-num"), { yPercent: 40, opacity: 0.2 }, {
            yPercent: 0, opacity: 1, ease: "none",
            scrollTrigger: { trigger: panel, containerAnimation: tween, start: "left 90%", end: "left 40%", scrub: true },
          });
        });
        return () => { trigger.current = null; };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="leadership" className="relative bg-ink-2">
      <div className="lead-pin relative overflow-clip lg:flex lg:h-[100svh] lg:items-center">
        <div className="orb -left-40 top-0 h-[36rem] w-[36rem] bg-violet/10" />
        <div ref={track} className="relative flex flex-col gap-6 px-5 py-32 sm:px-10 lg:flex-row lg:items-stretch lg:gap-8 lg:py-0 lg:pr-[10vw]">
          {/* Intro panel */}
          <div className="flex shrink-0 flex-col justify-center lg:w-[38vw]">
            <Eyebrow index="06" label="Leadership & Involvement" />
            <h2 className="text-[clamp(2.6rem,5.5vw,6rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white">
              Impact is a <em className="font-serif font-normal text-gradient">team sport.</em>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-white/55">
              The numbers are real, but the work behind them is the point: showing up for people, running operations, and building something from nothing.
            </p>
            <p className="mt-10 hidden items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/35 lg:flex">
              Keep scrolling <span className="h-px w-16 bg-white/25" /> →
            </p>
          </div>

          {leadership.map((l, i) => (
            <article
              key={l.role}
              className="lead-panel glass ring-anim group relative flex shrink-0 flex-col justify-between overflow-hidden rounded-[2rem] p-8 sm:p-10 lg:h-[min(86vh,48rem)] lg:w-[min(46vw,40rem)] lg:p-8"
            >
              <div className={`pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br ${glows[i % glows.length]} to-transparent blur-3xl transition-transform duration-1000 group-hover:scale-125`} />
              <div className="relative">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                  <span>{l.dates ?? ""}</span>
                  <span>0{i + 1} / 0{leadership.length}</span>
                </div>
                <h3 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{l.role}</h3>
                <p className="mt-2 text-white/60">{l.org}</p>
                {l.honors && (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {l.honors.map((h) => (
                      <li
                        key={h}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cyan/15 px-3 py-1.5 text-[13px] font-medium text-lavender"
                      >
                        <Award className="h-3.5 w-3.5" />
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {l.stat && (
              <div className="relative my-10 lg:my-0">
                <div className="lead-num">
                  <CountUp
                    value={l.stat.value}
                    prefix={l.stat.prefix}
                    suffix={l.stat.suffix}
                    className="block text-[clamp(3.5rem,min(10vw,13vh),9rem)] font-semibold leading-none tracking-[-0.06em] text-gradient"
                  />
                  <p className="mt-2 font-mono text-xs uppercase tracking-[0.2em] text-white/50">{l.stat.label}</p>
                </div>
                {l.secondary && (
                  <div className="mt-5 flex flex-wrap gap-10">
                    {l.secondary.map((s) => (
                      <div key={s.label}>
                        <CountUp value={s.value} prefix={s.prefix} suffix={s.suffix} className="text-4xl font-semibold tracking-tight text-white" />
                        <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">{s.label}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              )}

              {l.story && <p className="relative text-[15px] leading-relaxed text-white/65">{l.story}</p>}
              {l.points && (
                <ul className="relative space-y-2.5">
                  {l.points.map((pt) => (
                    <li key={pt} className="flex gap-3 text-[14px] leading-relaxed text-white/70">
                      <span className="mt-[0.6em] h-1 w-3 shrink-0 rounded-full bg-gradient-to-r from-electric to-cyan" />
                      {pt}
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>

        {/* Prev / next arrows (desktop pinned row); scrolling still works as before */}
        <div className="absolute bottom-6 right-10 hidden gap-2 lg:flex">
          {([-1, 1] as const).map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => step(d)}
              aria-label={d < 0 ? "Previous role" : "Next role"}
              className="grid h-12 w-12 place-items-center rounded-full border border-white/20 bg-ink-3/80 text-white backdrop-blur transition-colors hover:border-transparent hover:bg-white hover:text-ink"
            >
              {d < 0 ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
            </button>
          ))}
        </div>

        {/* Progress */}
        <div className="absolute bottom-10 left-1/2 hidden h-px w-48 -translate-x-1/2 bg-white/10 lg:block">
          <div className="lead-bar h-full origin-left bg-gradient-to-r from-cyan to-violet" style={{ transform: "scaleX(0)" }} />
        </div>
      </div>
    </section>
  );
}

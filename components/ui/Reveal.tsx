"use client";

import { useEffect, useRef, type ElementType, type ReactNode } from "react";
import { gsap } from "@/lib/gsap";

/** Headline that rises in word by word (masked) as it enters the viewport. */
export function RevealWords({
  text,
  as: Tag = "h2",
  className = "",
  wordClassName = (_w: string, _i: number) => "",
}: {
  text: string;
  as?: ElementType;
  className?: string;
  wordClassName?: (w: string, i: number) => string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".rw",
          { yPercent: 115, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 1.2, stagger: 0.05, ease: "expo.out", scrollTrigger: { trigger: ref.current, start: "top 85%" } },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <Tag ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        // Side padding (offset by negative margin) keeps italic overhangs from being clipped by the mask
        <span key={i} className="-ml-[0.08em] mr-[0.16em] inline-flex overflow-hidden px-[0.08em] pb-[0.12em] align-top">
          <span className={`rw inline-block ${wordClassName(w, i)}`}>{w}</span>
        </span>
      ))}
    </Tag>
  );
}

/** Paragraph whose words brighten from muted gray to white as you scroll through it. */
export function ScrubText({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".sw",
          { opacity: 0.18 },
          { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: ref.current, start: "top 80%", end: "bottom 45%", scrub: true } },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, []);
  return (
    <p ref={ref} className={className}>
      {text.split(" ").map((w, i) => (
        <span key={i} className="sw">
          {w}{" "}
        </span>
      ))}
    </p>
  );
}

/** Generic fade-and-rise for blocks, with optional stagger across direct children. */
export function FadeIn({
  children,
  className = "",
  stagger = 0,
  y = 40,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  y?: number;
  as?: ElementType;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const targets = stagger ? Array.from(el.children) : el;
        gsap.fromTo(
          targets,
          { opacity: 0, y },
          { opacity: 1, y: 0, duration: 1.1, stagger, ease: "expo.out", scrollTrigger: { trigger: el, start: "top 85%" } },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [stagger, y]);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

/** Small section eyebrow: index number + label + hairline. */
export function Eyebrow({ index, label, light = false }: { index: string; label: string; light?: boolean }) {
  return (
    <div className={`mb-8 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.25em] ${light ? "text-ink/50" : "text-white/45"}`}>
      <span className={light ? "text-butter" : "text-lavender"}>({index})</span>
      <span>{label}</span>
      <span className={`h-px flex-1 ${light ? "bg-ink/15" : "bg-white/10"}`} />
    </div>
  );
}

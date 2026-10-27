"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

/**
 * Custom cursor (fine pointers only). Elements can opt in to a label with
 * data-cursor="View Project"; links and buttons enlarge the ring.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine) and (hover: hover)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (fine && !reduced) setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });

    const move = (e: PointerEvent) => {
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor]");
      const interactive = target?.closest("a, button, [role=button], input, textarea");
      setLabel(labelled?.dataset.cursor ?? "");
      ring.current?.classList.toggle("is-hover", !!interactive && !labelled);
    };
    const hide = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.3 });
    const show = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.3 });
    window.addEventListener("pointermove", move);
    document.documentElement.addEventListener("pointerleave", hide);
    document.documentElement.addEventListener("pointerenter", show);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", show);
      document.documentElement.classList.remove("has-cursor");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[300] -ml-1 -mt-1 h-2 w-2 rounded-full bg-electric"
      />
      <div
        ref={ring}
        aria-hidden
        className={`cursor-ring pointer-events-none fixed left-0 top-0 z-[299] flex items-center justify-center rounded-full transition-[width,height,margin,background-color,border-color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          label
            ? "-ml-12 -mt-12 h-24 w-24 border border-transparent bg-white text-ink"
            : "-ml-5 -mt-5 h-10 w-10 border border-electric/50"
        }`}
      >
        <span
          className={`whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] transition-opacity duration-300 ${
            label ? "opacity-100" : "opacity-0"
          }`}
        >
          {label}
        </span>
      </div>
      <style>{`.cursor-ring.is-hover{width:4rem;height:4rem;margin:-2rem 0 0 -2rem;background:rgba(212,162,60,.12);border-color:rgba(168,122,44,.7)}`}</style>
    </>
  );
}

"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import { gsap } from "@/lib/gsap";

/** Deterministic pseudo-random in [0, 1) so server and client render identical tiles. */
const rand = (i: number, salt: number) => {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

// Paper stock: mostly creams, with the occasional meadow-green or honey tile
const PAPERS = ["#fffdf7", "#f7f0e1", "#eef0dd", "#fbf3dc", "#fdf8ef"];
const ACCENTS = [
  { bg: "#3d5230", fg: "#f7f0e1" }, // forest tile, cream letter
  { bg: "#e9c46a", fg: "#27301f" }, // honey tile
  { bg: "#c9d4b0", fg: "#27301f" }, // sage tile
];

export type TileStyle = {
  rotate: number;
  dy: number;
  bg: string;
  fg: string;
  clip: string;
  scatterX: number;
  scatterY: number;
  scatterR: number;
};

/** Per-letter variation: tilt, baseline wobble, paper color, and an uneven "scissor-cut" outline. */
export function tileStyle(i: number, seed: number): TileStyle {
  const r = (salt: number) => rand(i + seed * 31, salt);
  const accentPick = r(9);
  const accent = accentPick < 0.12 ? ACCENTS[0] : accentPick < 0.2 ? ACCENTS[1] : accentPick < 0.26 ? ACCENTS[2] : null;
  const j = (salt: number, max = 6) => (r(salt) * max).toFixed(1);
  return {
    rotate: (r(1) - 0.5) * 14,
    dy: (r(2) - 0.5) * 0.12,
    bg: accent?.bg ?? PAPERS[Math.floor(r(3) * PAPERS.length)],
    fg: accent?.fg ?? "#27301f",
    clip: `polygon(${j(4)}% ${j(5)}%, ${100 - Number(j(6))}% ${j(7, 4)}%, ${100 - Number(j(8, 3))}% ${100 - Number(j(10))}%, ${j(11, 3)}% ${100 - Number(j(12, 4))}%)`,
    scatterX: (r(13) - 0.5) * 260,
    scatterY: (r(14) - 0.5) * 300,
    scatterR: (r(15) - 0.5) * 80,
  };
}

/**
 * Ransom-note style word: each letter on its own cut paper tile.
 * - `animate="view"` drops the tiles in when they scroll into view.
 * - `animate="none"` leaves animation to a parent timeline (target `.cut-tile`;
 *   each tile carries data-x / data-y / data-r scatter offsets).
 */
export default function Cutout({
  text,
  seed = 1,
  className = "",
  animate = "view",
  label = true,
}: {
  text: string;
  seed?: number;
  className?: string;
  animate?: "view" | "none";
  label?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (animate !== "view") return;
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".cut-tile",
          { y: -50, rotate: (i: number) => (i % 2 ? 22 : -22), opacity: 0, scale: 0.8 },
          {
            y: 0, rotate: 0, opacity: 1, scale: 1,
            duration: 0.9, stagger: 0.05, ease: "back.out(1.8)",
            scrollTrigger: { trigger: ref.current, start: "top 85%" },
          },
        );
      });
    }, ref);
    return () => ctx.revert();
  }, [animate]);

  let letterIndex = 0;
  return (
    <span ref={ref} className={`cutout inline-flex flex-nowrap items-center ${className}`}>
      {label && <span className="sr-only">{text}</span>}
      {text.split("").map((c, k) => {
        if (c === " ") return <span key={k} aria-hidden className="inline-block w-[0.3em]" />;
        const t = tileStyle(letterIndex++, seed);
        const style = {
          "--tile-r": `${t.rotate}deg`,
          "--tile-dy": `${t.dy}em`,
          background: t.bg,
          color: t.fg,
          clipPath: t.clip,
        } as CSSProperties;
        return (
          <span
            key={k}
            aria-hidden
            className="cut-tile"
            data-x={t.scatterX}
            data-y={t.scatterY}
            data-r={t.scatterR}
          >
            <span className="cut-paper" style={style}>
              {c}
            </span>
          </span>
        );
      })}
    </span>
  );
}

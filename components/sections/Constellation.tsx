"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { gsap } from "@/lib/gsap";
import { constellation } from "@/content/site";
import { useMediaQuery } from "@/lib/hooks";
import { Eyebrow, RevealWords } from "@/components/ui/Reveal";

// Landscape map for wider screens; a tall portrait map on phones so every label stays readable
const LAYOUTS = {
  wide: { W: 1000, H: 640, RX: 360, RY: 225, orbit: [380, 240], label: 17, center: 15, core: 44 },
  tall: { W: 600, H: 900, RX: 185, RY: 330, orbit: [220, 360], label: 22, center: 19, core: 64 },
};

export default function Constellation() {
  const root = useRef<HTMLElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState<string | null>(null);
  const narrow = useMediaQuery("(max-width: 639px)");
  const L = narrow ? LAYOUTS.tall : LAYOUTS.wide;
  const { W, H } = L;
  const CX = W / 2;
  const CY = H / 2;

  // Nodes sit on a gently irregular ellipse around the center
  const nodes = useMemo(
    () =>
      constellation.nodes.map((n, i) => {
        const a = (i / constellation.nodes.length) * Math.PI * 2 - Math.PI / 2;
        const r = 1 + (i % 2 ? 0.08 : -0.06);
        return { ...n, x: CX + Math.cos(a) * L.RX * r, y: CY + Math.sin(a) * L.RY * r, depth: 0.4 + (i % 3) * 0.3 };
      }),
    [L, CX, CY],
  );
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  const connected = (id: string) =>
    new Set(constellation.links.filter(([a, b]) => a === id || b === id).flatMap((l) => l));

  const activeNode = active ? byId[active] : null;
  const near = active ? connected(active) : new Set<string>();

  // Pointer parallax: each node layer drifts by its depth
  useEffect(() => {
    const el = svg.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layers = gsap.utils.toArray<SVGGElement>(".cn-node", el);
    const setters = layers.map((l) => ({
      x: gsap.quickTo(l, "x", { duration: 1.2, ease: "power3" }),
      y: gsap.quickTo(l, "y", { duration: 1.2, ease: "power3" }),
      d: Number(l.dataset.depth),
    }));
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5;
      const ny = (e.clientY - r.top) / r.height - 0.5;
      setters.forEach((s) => { s.x(nx * 40 * s.d); s.y(ny * 30 * s.d); });
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({ scrollTrigger: { trigger: svg.current, start: "top 75%" } });
        tl.fromTo(".cn-center", { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 1, ease: "back.out(1.7)" })
          .fromTo(".cn-spoke", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.2, stagger: 0.05, ease: "power2.inOut" }, 0.3)
          .fromTo(".cn-dot", { scale: 0, transformOrigin: "center" }, { scale: 1, duration: 0.8, stagger: 0.06, ease: "back.out(2)" }, 0.6)
          .fromTo(".cn-label", { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.05 }, 0.9)
          .fromTo(".cn-link", { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.4, stagger: 0.04, ease: "power2.inOut" }, 1);
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} id="interests" className="relative overflow-clip bg-ink-2 py-32 sm:py-40">
      <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-10">
        <Eyebrow index="04" label="Interest map" />
        <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
          <RevealWords
            text="A network of ideas."
            className="text-[clamp(2.6rem,6.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white"
            wordClassName={(w) => (w === "ideas." ? "font-serif font-normal italic text-gradient" : "")}
          />
          <p className="max-w-md text-lg leading-relaxed text-white/55 lg:justify-self-end">
            Hover or tab through the nodes to see how my interests feed each other.
          </p>
        </div>

        <div className="relative mt-14 grid gap-8 lg:grid-cols-[1fr_20rem]">
          <div className="relative -mx-3 sm:mx-0">
            <svg
              ref={svg}
              viewBox={`0 0 ${W} ${H}`}
              className="mx-auto w-full"
              role="group"
              aria-label="Interactive constellation of interests"
            >
              <defs>
                <radialGradient id="cn-core">
                  <stop offset="0" stopColor="#f2d27a" />
                  <stop offset="0.4" stopColor="#d4a23c" />
                  <stop offset="1" stopColor="#9cae81" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="cn-line" x1="0" x2="1">
                  <stop offset="0" stopColor="#5b7a3a" />
                  <stop offset="1" stopColor="#c08a2a" />
                </linearGradient>
                <filter id="cn-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* Orbits */}
              {[1, 0.66, 0.33].map((s) => (
                <ellipse key={s} cx={CX} cy={CY} rx={L.orbit[0] * s} ry={L.orbit[1] * s} fill="none" stroke="#27301f" strokeOpacity="0.1" strokeDasharray="2 6" />
              ))}

              {/* Spokes from the center */}
              {nodes.map((n) => (
                <line
                  key={n.id}
                  className="cn-spoke"
                  x1={CX} y1={CY} x2={n.x} y2={n.y}
                  pathLength={1} strokeDasharray="1"
                  stroke="#27301f"
                  strokeOpacity={active === n.id ? 0.5 : 0.1}
                  style={{ transition: "stroke-opacity .4s" }}
                />
              ))}

              {/* Idea links */}
              {constellation.links.map(([a, b]) => {
                const A = byId[a];
                const B = byId[b];
                const lit = active && (a === active || b === active);
                const mx = (A.x + B.x) / 2 + (CY - (A.y + B.y) / 2) * 0.25;
                const my = (A.y + B.y) / 2 + ((A.x + B.x) / 2 - CX) * 0.15;
                return (
                  <path
                    key={a + b}
                    className="cn-link"
                    d={`M${A.x},${A.y} Q${mx},${my} ${B.x},${B.y}`}
                    fill="none"
                    stroke="url(#cn-line)"
                    strokeWidth={lit ? 2 : 1}
                    strokeOpacity={active ? (lit ? 1 : 0.08) : 0.35}
                    pathLength={1}
                    strokeDasharray="1"
                    style={{ transition: "stroke-opacity .4s, stroke-width .4s" }}
                  />
                );
              })}

              {/* Center */}
              <g className="cn-center">
                <circle cx={CX} cy={CY} r={L.core * 1.6} fill="url(#cn-core)" opacity="0.35">
                  <animate attributeName="r" values={`${L.core * 1.4};${L.core * 1.8};${L.core * 1.4}`} dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx={CX} cy={CY} r={L.core} fill="#fbf7ee" stroke="url(#cn-line)" strokeWidth="1.5" />
                <text x={CX} y={CY + 5} textAnchor="middle" className="fill-white font-semibold" style={{ fontSize: L.center }}>
                  {constellation.center}
                </text>
              </g>

              {/* Nodes */}
              {nodes.map((n) => {
                const isActive = active === n.id;
                const dim = active && !isActive && !near.has(n.id);
                const labelBelow = n.y > CY;
                return (
                  <g key={n.id} className="cn-node" data-depth={n.depth}>
                    <g
                      tabIndex={0}
                      role="button"
                      aria-label={`${n.label}: ${n.detail}`}
                      aria-pressed={isActive}
                      onMouseEnter={() => setActive(n.id)}
                      onMouseLeave={() => setActive(null)}
                      onFocus={() => setActive(n.id)}
                      onBlur={() => setActive(null)}
                      onClick={() => setActive(isActive ? null : n.id)}
                      className="cursor-pointer outline-none"
                      style={{ opacity: dim ? 0.3 : 1, transition: "opacity .4s" }}
                    >
                      <circle cx={n.x} cy={n.y} r={34} fill="transparent" />
                      <circle
                        className="cn-dot"
                        cx={n.x} cy={n.y}
                        r={isActive ? 13 : 8}
                        fill={isActive ? "#c08a2a" : "#7d9a4a"}
                        filter="url(#cn-glow)"
                        style={{ transition: "r .4s, fill .4s" }}
                      />
                      <circle cx={n.x} cy={n.y} r={isActive ? 26 : 16} fill="none" stroke="#7d9a4a" strokeOpacity={isActive ? 0.6 : 0.25} style={{ transition: "r .4s, stroke-opacity .4s" }} />
                      <text
                        className="cn-label fill-white font-medium"
                        x={n.x}
                        y={labelBelow ? n.y + 46 : n.y - 34}
                        style={{ fontSize: L.label, opacity: dim ? 0.5 : 1 }}
                        textAnchor="middle"
                      >
                        {n.label}
                      </text>
                    </g>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Detail panel */}
          <aside className="glass relative flex min-h-56 flex-col justify-between rounded-3xl p-7" aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode?.id ?? "none"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35 }}
              >
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-lavender">
                  {activeNode ? "Node" : "Explore"}
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight text-white">
                  {activeNode ? activeNode.label : constellation.center}
                </h3>
                <p className="mt-3 leading-relaxed text-white/60">
                  {activeNode
                    ? activeNode.detail
                    : "Eight interests, one through-line: understanding people and systems well enough to make better decisions."}
                </p>
                {activeNode && near.size > 0 && (
                  <p className="mt-4 text-sm text-white/40">
                    Connects to{" "}
                    {[...near].filter((id) => id !== activeNode.id).map((id) => byId[id].label).join(", ")}
                  </p>
                )}
              </motion.div>
            </AnimatePresence>
            <p className="mt-8 border-t border-white/10 pt-4 text-xs leading-relaxed text-white/35">{constellation.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

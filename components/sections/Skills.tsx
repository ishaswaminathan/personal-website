"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Code2, BarChart3, Microscope, Compass, Wrench, Users } from "lucide-react";
import { skills } from "@/content/site";
import { Eyebrow, FadeIn, RevealWords } from "@/components/ui/Reveal";

const icons = [Code2, BarChart3, Microscope, Compass, Wrench, Users];
const tints = ["#5b7a3a", "#c08a2a", "#7d9a4a", "#c9785a", "#8a9a5b", "#a87a2c"];
const ease = [0.16, 1, 0.3, 1] as const;

export default function Skills() {
  const [active, setActive] = useState(0);

  return (
    <section id="skills" className="relative overflow-clip bg-ink py-32 sm:py-44">
      <div className="orb left-1/3 top-1/3 h-[30rem] w-[30rem] bg-electric/10" />
      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-10">
        <Eyebrow index="05" label="Skills" />
        <div className="mb-16 grid gap-8 lg:grid-cols-2 lg:items-end">
          <RevealWords
            text="The toolkit, in motion."
            className="text-[clamp(2.6rem,6.5vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.045em] text-white"
            wordClassName={(w) => (w === "motion." ? "font-serif font-normal italic text-gradient" : "")}
          />
          <p className="max-w-md text-lg leading-relaxed text-white/55 lg:justify-self-end">
            No progress bars. Just what I use, grouped by how I use it. Hover or tap a panel to open it.
          </p>
        </div>

        <FadeIn className="flex flex-col gap-3 lg:h-[34rem] lg:flex-row">
          {skills.map((group, i) => {
            const Icon = icons[i % icons.length];
            const open = active === i;
            return (
              <div
                key={group.category}
                onMouseEnter={() => setActive(i)}
                className={`glass relative overflow-hidden rounded-3xl ${open ? "lg:flex-[3.2]" : "lg:flex-[0.8]"} ${open ? "ring-1 ring-white/15" : ""}`}
                style={{ transition: "flex 0.8s cubic-bezier(0.16,1,0.3,1)" }}
              >
                <div
                  className="pointer-events-none absolute inset-0 transition-opacity duration-700"
                  style={{ opacity: open ? 1 : 0, background: `radial-gradient(120% 80% at 0% 0%, ${tints[i]}33, transparent 60%)` }}
                />
                <button
                  onClick={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  aria-expanded={open}
                  aria-controls={`skills-${i}`}
                  className={`relative flex w-full items-center justify-between gap-4 p-6 text-left lg:h-full lg:flex-col lg:items-start lg:p-7 ${open ? "lg:justify-start lg:gap-6" : "lg:justify-between"}`}
                >
                  <span className="flex items-center gap-4 lg:flex-col lg:items-start">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-white/5" style={{ color: tints[i] }}>
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-[11px] text-white/35">0{i + 1}</span>
                  </span>
                  <span
                    className={`text-xl font-semibold tracking-tight text-white transition-all duration-700 lg:origin-bottom-left lg:whitespace-nowrap ${
                      open ? "" : "lg:absolute lg:bottom-7 lg:left-[3.4rem] lg:-rotate-90 lg:text-lg lg:text-white/70"
                    }`}
                  >
                    {group.category}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {open && (
                    <motion.div
                      id={`skills-${i}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease }}
                      className="relative overflow-hidden px-6 pb-7 lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-auto lg:px-7"
                    >
                      <p className="mb-5 text-white/50">{group.blurb}</p>
                      <ul className="flex flex-wrap gap-2">
                        {group.items.map((s, k) => (
                          <motion.li
                            key={s}
                            initial={{ opacity: 0, y: 14, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ delay: 0.15 + k * 0.04, duration: 0.5, ease }}
                            className="rounded-full border border-white/12 bg-white/[0.05] px-4 py-2 text-sm text-white/85 transition-colors hover:border-white/30 hover:bg-white/10"
                          >
                            {s}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </FadeIn>
      </div>
    </section>
  );
}

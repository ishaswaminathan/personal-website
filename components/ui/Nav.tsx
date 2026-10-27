"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/content/site";
import { scrollToId } from "@/lib/scroll";
import Magnetic from "./Magnetic";
import Cutout from "./Cutout";

export default function Nav() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active-section tracking: whichever section crosses the viewport's middle band
  useEffect(() => {
    if (!isHome) return;
    const sections = nav.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [isHome]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
  }, [open]);

  const go = (id: string) => {
    setOpen(false);
    if (isHome) scrollToId(id);
    else router.push(id === "home" ? "/" : `/#${id}`);
  };

  return (
    <>
      <motion.div
        aria-hidden
        style={{ scaleX: progress }}
        className="fixed inset-x-0 top-0 z-[120] h-[2px] origin-left bg-gradient-to-r from-electric via-lavender to-cyan"
      />
      <header className="fixed inset-x-0 top-0 z-[110] flex justify-center px-4 pt-4 sm:pt-5">
        <nav
          aria-label="Primary"
          className={`flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:px-4 ${
            scrolled
              ? "border border-white/10 bg-[rgba(251,247,238,0.72)] shadow-[0_10px_40px_-18px_rgba(80,64,24,0.35)] backdrop-blur-xl backdrop-saturate-150"
              : "border border-transparent"
          }`}
        >
          <button
            onClick={() => go("home")}
            className="group flex items-center gap-2.5 rounded-full py-1 pl-1 pr-3"
            aria-label={`${site.name.first} ${site.name.last}, back to top`}
          >
            <Cutout text={site.initials} seed={2} animate="none" label={false} className="text-[17px]" />
            <span className="hidden text-sm font-medium tracking-tight text-white/90 sm:block">
              {site.name.first} <span className="text-white/50">{site.name.last}</span>
            </span>
          </button>

          <ul className="hidden items-center gap-1 lg:flex">
            {nav.slice(1).map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => go(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative rounded-full px-3.5 py-2 text-[13px] transition-colors ${
                      isActive ? "text-white" : "text-white/55 hover:text-white"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-white/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="u-link relative pb-0.5" aria-current={isActive ? "true" : undefined}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <Magnetic strength={0.3}>
              <a
                href={site.contact.linkedin}
                target="_blank"
                rel="noopener"
                className="group relative inline-flex items-center gap-1.5 overflow-hidden rounded-full bg-white px-4 py-2 text-[13px] font-medium text-ink"
              >
                <span className="absolute inset-0 translate-y-full bg-gradient-to-r from-cyan to-butter transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0" />
                <span className="relative transition-colors duration-300 group-hover:text-white">LinkedIn</span>
                <ArrowUpRight className="relative h-3.5 w-3.5 transition-all duration-300 group-hover:rotate-45 group-hover:text-white" />
              </a>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              className="relative grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              <span className={`absolute h-px w-4 bg-white transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-[3px]"}`} />
              <span className={`absolute h-px w-4 bg-white transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-[3px]"}`} />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[105] flex flex-col justify-between overflow-hidden bg-ink-2 px-6 pb-10 pt-28 lg:hidden"
          >
            <div className="orb -right-20 top-10 h-72 w-72 bg-violet/40" />
            <div className="orb -left-20 bottom-20 h-72 w-72 bg-electric/30" />
            <ul className="relative space-y-1">
              {nav.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.15 + i * 0.05, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <button
                    onClick={() => go(item.id)}
                    className="flex w-full items-baseline gap-4 py-1.5 text-left text-[2.6rem] font-semibold leading-tight tracking-tight text-white"
                  >
                    <span className="font-mono text-xs text-white/35">0{i + 1}</span>
                    {item.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.5 } }}
              exit={{ opacity: 0 }}
              className="relative flex flex-col gap-2 text-sm text-white/60"
            >
              <a href={`mailto:${site.contact.email}`}>{site.contact.email}</a>
              <a href={site.contact.linkedin} target="_blank" rel="noopener">LinkedIn ↗</a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

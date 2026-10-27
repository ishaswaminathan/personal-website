"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, ArrowUpRight, Check, Copy, Mail } from "lucide-react";
import { gsap } from "@/lib/gsap";
import { site, fullName } from "@/content/site";
import { scrollToId } from "@/lib/scroll";
import { RevealWords } from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import Cutout from "@/components/ui/Cutout";
import { GitHubIcon, LinkedInIcon } from "@/components/ui/Icons";

const links = [
  { label: "Email", value: site.contact.email, href: `mailto:${site.contact.email}`, Icon: Mail, external: false },
  { label: "LinkedIn", value: "in/ishaswaminathan", href: site.contact.linkedin, Icon: LinkedInIcon, external: true },
  { label: "GitHub", value: site.contact.github.replace(/^https?:\/\/(www\.)?github\.com\//, "@"), href: site.contact.github, Icon: GitHubIcon, external: true },
  // GitHub stays hidden until a real profile URL is set in content/site.ts
].filter((l) => l.label !== "GitHub" || !/github\.com\/?$/.test(l.href));

export default function Contact() {
  const root = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  // Cursor-following gradient light
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const light = el.querySelector<HTMLElement>(".contact-light");
    if (!light || !window.matchMedia("(pointer: fine)").matches) return;
    const xTo = gsap.quickTo(light, "x", { duration: 1.4, ease: "power3" });
    const yTo = gsap.quickTo(light, "y", { duration: 1.4, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      xTo(e.clientX - r.left);
      yTo(e.clientY - r.top);
    };
    el.addEventListener("pointermove", move);
    return () => el.removeEventListener("pointermove", move);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.matchMedia().add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(".c-row", { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, stagger: 0.08, duration: 1, ease: "expo.out",
          scrollTrigger: { trigger: ".c-rows", start: "top 85%" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  return (
    <section ref={root} id="contact" className="relative overflow-clip bg-ink pt-32 sm:pt-44">
      <div className="contact-light pointer-events-none absolute left-0 top-0 -ml-[20rem] -mt-[20rem] h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(212,162,60,0.22),transparent_60%)]" />
      <div className="orb -bottom-40 left-1/2 h-[40rem] w-[60rem] -translate-x-1/2 bg-violet/15" />

      <div className="relative mx-auto max-w-[90rem] px-5 sm:px-10">
        <p className="mb-8 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">
          <span className="text-lavender">(08)</span> Contact
        </p>
        <RevealWords
          text="Let's Build Something Meaningful."
          className="max-w-[12ch] text-[clamp(3rem,10vw,11rem)] font-semibold leading-[0.88] tracking-[-0.055em] text-white"
          wordClassName={(w) => (w === "Meaningful." ? "font-serif font-normal italic text-gradient tracking-[-0.03em]" : "")}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-end">
          <p className="max-w-md text-xl leading-relaxed text-white/60">
            I&apos;m always open to new ideas, meaningful collaborations, and opportunities at the intersection of data, product, and technology!
          </p>

          <div className="flex flex-col items-start gap-4">
            <Magnetic strength={0.2}>
              <a
                href={`mailto:${site.contact.email}`}
                className="group relative inline-flex items-center gap-4 rounded-full bg-white py-3 pl-7 pr-3 text-[clamp(1rem,2.2vw,1.6rem)] font-medium tracking-tight text-ink"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-electric via-violet to-cyan opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-70" />
                <span className="relative break-all">{site.contact.email}</span>
                <span className="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-5 w-5" />
                </span>
              </a>
            </Magnetic>
            <button onClick={copy} className="ml-3 inline-flex items-center gap-2 py-2.5 text-sm text-white/50 transition-colors hover:text-white">
              {copied ? <Check className="h-4 w-4 text-cyan" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied to clipboard" : "Copy email"}
            </button>
          </div>
        </div>

        <ul className="c-rows mt-24 border-t border-white/10">
          {links.map(({ label, value, href, Icon, external }) => (
            <li key={label} className="c-row border-b border-white/10">
              <a
                href={href}
                {...(external ? { target: "_blank", rel: "noopener" } : {})}
                className="group relative flex items-center justify-between gap-6 overflow-hidden py-7"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-gradient-to-r from-electric/15 via-violet/10 to-transparent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
                <span className="relative flex items-center gap-6">
                  <Icon className="h-5 w-5 text-white/40 transition-colors group-hover:text-cyan" />
                  <span className="text-[clamp(1.8rem,4vw,3.4rem)] font-semibold tracking-[-0.04em] text-white transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                    {label}
                  </span>
                </span>
                <span className="relative flex items-center gap-5">
                  <span className="hidden font-mono text-xs uppercase tracking-[0.2em] text-white/40 sm:block">{value}</span>
                  <span className="relative grid h-12 w-12 place-items-center overflow-hidden rounded-full border border-white/15">
                    <ArrowUpRight className="h-5 w-5 text-white transition-transform duration-500 group-hover:-translate-y-8 group-hover:translate-x-8" />
                    <ArrowUpRight className="absolute h-5 w-5 -translate-x-8 translate-y-8 text-cyan transition-transform duration-500 group-hover:translate-x-0 group-hover:translate-y-0" />
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Giant name, bleeding off the edges */}
      <div className="relative mt-24 overflow-hidden" aria-hidden>
        <div className="giant-name flex flex-col items-center gap-[0.04em] px-4 py-[0.4em] uppercase">
          <Cutout text={site.name.first} seed={19} label={false} className="text-[clamp(3.5rem,15vw,15rem)]" />
          <Cutout text={site.name.last} seed={23} label={false} className="text-[clamp(1.6rem,7.4vw,8rem)]" />
        </div>
      </div>

      <footer className="relative mx-auto flex max-w-[90rem] flex-col items-center justify-between gap-6 px-5 py-10 text-sm text-white/40 sm:flex-row sm:px-10">
        <p>© {new Date().getFullYear()} {fullName}.</p>
        <Magnetic>
          <button
            onClick={() => scrollToId("home")}
            className="group inline-flex items-center gap-3 whitespace-nowrap rounded-full border border-white/15 py-2 pl-5 pr-2 text-white/70 transition-colors hover:text-white"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center overflow-hidden rounded-full bg-white text-ink">
              <ArrowUp className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:animate-bounce" />
            </span>
          </button>
        </Magnetic>
      </footer>
    </section>
  );
}

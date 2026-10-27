import type { ProjectVisual as Kind } from "@/content/site";

/**
 * Art-directed, code-drawn previews for each project type. They stand in for
 * screenshots; drop a real image into a project's card if you prefer.
 * All shapes are illustrative; none of them encode real data.
 */
export default function ProjectVisual({ kind, accent }: { kind: Kind; accent: string }) {
  switch (kind) {
    case "museum":
      return <Museum accent={accent} />;
    case "medconnect":
      return <MedConnect accent={accent} />;
    case "gaze":
      return <Gaze accent={accent} />;
  }
}

function Frame({ children, accent, tone = "dark" }: { children: React.ReactNode; accent: string; tone?: "dark" | "light" }) {
  return (
    <div
      className={`pv relative h-full w-full overflow-hidden ${tone === "light" ? "bg-[#eef2ef]" : "bg-[#f2ead9]"}`}
      style={{ ["--accent" as string]: accent }}
    >
      <div
        className="absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full opacity-50 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}, transparent 65%)` }}
      />
      <div className="pv-inner absolute inset-0 transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]">
        {children}
      </div>
    </div>
  );
}

function Museum({ accent }: { accent: string }) {
  return (
    <Frame accent={accent} tone="light">
      <div className="absolute inset-0 flex flex-col p-[6%]">
        <div className="flex items-center justify-between text-[#111]">
          <span className="font-serif text-[clamp(1rem,2.4vw,1.9rem)] italic">MonoMuse</span>
          <div className="flex gap-4 font-mono text-[9px] uppercase tracking-[0.2em] text-black/50">
            <span>Explore</span><span>Exhibitions</span><span className="rounded-full bg-[#729ca8] px-2 py-0.5 text-white">Buy Tickets</span>
          </div>
        </div>
        <div className="mt-[6%] grid flex-1 grid-cols-3 items-end gap-[4%]">
          {/* MonoMuse design-guide palette: #cedad2 #9fb8bb #729ca8 #9cae81 */}
          {["from-[#729ca8] to-[#9fb8bb]", "from-[#9cae81] to-[#cedad2]", "from-[#5f8794] to-[#9fb8bb]"].map((g, i) => (
            <div
              key={i}
              className={`relative overflow-hidden rounded-t-full bg-gradient-to-b ${g} transition-transform duration-700 group-hover:-translate-y-2`}
              style={{ height: `${[78, 95, 70][i]}%`, transitionDelay: `${i * 80}ms` }}
            >
              <div className="absolute inset-[10%] rounded-t-full border border-white/15" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/50" />
            </div>
          ))}
        </div>
        <div className="mt-[4%] flex items-center justify-between border-t border-black/10 pt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-black/50">
          <span>Now on view</span>
          <span className="flex items-center gap-2">Admission <span className="h-px w-6 bg-black/40" /> Checkout</span>
        </div>
      </div>
      {/* Ticket stub */}
      <div className="absolute bottom-[14%] right-[6%] w-[30%] rotate-[-6deg] rounded-lg bg-[#111] p-3 text-white shadow-2xl transition-transform duration-700 group-hover:rotate-[-2deg] group-hover:-translate-y-2">
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/50">Admit one</p>
        <p className="mt-1 font-serif text-sm italic">MonoMuse</p>
        <div className="mt-2 border-t border-dashed border-white/25 pt-2 font-mono text-[8px] tracking-[0.2em] text-white/50">— — — — — —</div>
      </div>
    </Frame>
  );
}

function Gaze({ accent }: { accent: string }) {
  return (
    <Frame accent={accent}>
      <div className="absolute inset-[8%] rounded-xl border border-white/10 bg-white/[0.03]">
        <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2">
          {[0, 1, 2].map((i) => <span key={i} className="h-1.5 w-1.5 rounded-full bg-white/20" />)}
          <span className="ml-3 h-2 w-1/3 rounded-full bg-white/10" />
        </div>
        <div className="grid grid-cols-3 gap-3 p-4">
          <div className="col-span-2 h-4 rounded bg-white/15" />
          <div className="h-4 rounded bg-white/10" />
          <div className="col-span-3 h-16 rounded-lg bg-white/[0.06]" />
          <div className="h-10 rounded bg-white/[0.06]" />
          <div className="h-10 rounded bg-white/[0.06]" />
          <div className="h-10 rounded bg-white/[0.06]" />
        </div>
        {/* Heat blobs + scanpath (illustrative) */}
        <div className="absolute left-[22%] top-[30%] h-20 w-20 rounded-full opacity-70 blur-xl" style={{ background: accent }} />
        <div className="absolute left-[60%] top-[55%] h-14 w-14 rounded-full bg-violet opacity-60 blur-xl" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <polyline
            points="18,28 30,35 64,30 52,58 66,62 34,70"
            fill="none"
            stroke="#27301f"
            strokeOpacity=".6"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            strokeDasharray="4 4"
          />
          {[[18, 28], [30, 35], [64, 30], [52, 58], [66, 62], [34, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={1.6} fill="#27301f" className="origin-center transition-transform duration-500 group-hover:scale-150" style={{ transformBox: "fill-box" }} />
          ))}
        </svg>
      </div>
      <div className="absolute bottom-[3%] right-[8%] font-mono text-[9px] uppercase tracking-[0.25em] text-white/40">gaze → description</div>
    </Frame>
  );
}

function MedConnect({ accent }: { accent: string }) {
  const timeline = [
    { label: "Primary care", note: "Annual checkup", dot: accent },
    { label: "Lab results", note: "Shared with care team", dot: "#d4a23c" },
    { label: "Cardiology", note: "Referral approved", dot: "#9cae81" },
    { label: "Pharmacy", note: "Refill reminder", dot: "#c9785a" },
  ];
  return (
    <Frame accent={accent}>
      {/* Connected provider dots */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
        {[[14, 24], [16, 72], [86, 22], [84, 76]].map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2="50" y2="50" stroke="#27301f" strokeOpacity=".15" strokeDasharray="1.5 2" vectorEffect="non-scaling-stroke" />
            <circle cx={x} cy={y} r="2.2" fill={i % 2 ? "#9cae81" : accent} />
          </g>
        ))}
      </svg>
      <div className="absolute left-1/2 top-1/2 w-[42%] min-w-[11rem] -translate-x-1/2 -translate-y-1/2 rounded-[1.4rem] border border-black/10 bg-[#fffdf7] p-3 shadow-[0_24px_50px_-20px_rgba(60,48,16,0.5)] transition-transform duration-700 group-hover:-translate-y-[54%]">
        <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/10" />
        <p className="font-serif text-base italic text-[#27301f]">MedConnect</p>
        <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-black/45">Your care, connected.</p>
        <ul className="mt-3 space-y-2">
          {timeline.map((t, i) => (
            <li
              key={t.label}
              className="flex items-center gap-2 rounded-lg bg-black/[0.035] px-2 py-1.5 transition-transform duration-500 group-hover:translate-x-1"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: t.dot }} />
              <span className="min-w-0">
                <span className="block truncate text-[10px] font-semibold text-[#27301f]">{t.label}</span>
                <span className="block truncate text-[9px] text-black/50">{t.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Frame>
  );
}

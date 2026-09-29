import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import { Check, RefreshCw, ShieldCheck, Scale } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import { EASE } from "./motion";

type ScanId = "security" | "legal";

type TerminalLine = { text: string; kind: "cmd" | "ok" | "warn" | "out" };

type Scan = {
  id: ScanId;
  tab: string;
  title: string;
  score: number;
  status: string;
  statusTone: "emerald" | "amber";
  caption: string;
  chips: string[];
  icon: typeof ShieldCheck;
  lines: TerminalLine[];
};

const SCANS: Record<ScanId, Scan> = {
  security: {
    id: "security",
    tab: "Vulnerability",
    title: "Vulnerability Score",
    score: 94,
    status: "Low Risk",
    statusTone: "emerald",
    caption: "Adversarial input testing across every AI surface",
    chips: ["Prompt Injections", "API Keys", "Jailbreaks"],
    icon: ShieldCheck,
    lines: [
      { text: "npx ai-guard-cli scan", kind: "cmd" },
      { text: "Indexed 148 files · 24 AI surface routes", kind: "ok" },
      { text: "Fuzzing 12 system prompts (1,240 payloads)", kind: "ok" },
      { text: "Swept secrets, auth guards, rate limits", kind: "ok" },
      { text: "0 critical · 3 medium · 9 low", kind: "out" },
      { text: "Vulnerability score: 94/100 — LOW RISK", kind: "ok" },
      { text: "report → ./ai-guard/report.html", kind: "out" },
    ],
  },
  legal: {
    id: "legal",
    tab: "Legal Risk",
    title: "Legal Risk Score",
    score: 88,
    status: "Compliant",
    statusTone: "emerald",
    caption: "Disclosure, copyright, and privacy exposure review",
    chips: ["Copyright", "PII Leakage", "AI Disclaimers"],
    icon: Scale,
    lines: [
      { text: "npx ai-guard-cli scan --legal", kind: "cmd" },
      { text: "Auditing 24 AI surfaces for disclosure gaps", kind: "ok" },
      { text: "Checking training-data & copyright exposure", kind: "ok" },
      { text: "Tracing PII flows across 6 integrations", kind: "ok" },
      { text: "0 blockers · 2 advisories", kind: "out" },
      { text: "Legal risk score: 88/100 — COMPLIANT", kind: "ok" },
      { text: "brief → ./ai-guard/legal-brief.pdf", kind: "out" },
    ],
  },
};

function useCountUp(target: number, active: boolean, duration = 1.1) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    setValue(0);
    const controls = animate(0, target, {
      duration,
      ease: EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [target, active, duration]);

  return value;
}

function ScoreGauge({
  score,
  active,
  id,
}: {
  score: number;
  active: boolean;
  id: ScanId;
}) {
  const gradientId = `gauge-${id}`;
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="relative size-[86px] shrink-0 sm:size-[104px]">
      <svg viewBox="0 0 96 96" className="size-full -rotate-90">
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="100%" stopColor="#0d9488" />
          </linearGradient>
        </defs>
        <circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth="9"
        />
        <motion.circle
          cx="48"
          cy="48"
          r={radius}
          fill="none"
          stroke={`url(#${gradientId})`}
          strokeWidth="9"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{
            strokeDashoffset: circumference * (1 - (active ? score : score) / 100),
          }}
          transition={{ duration: 1.15, ease: EASE }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="font-display text-xl font-extrabold leading-none text-slate-900 tabular-nums sm:text-2xl">
          {score}
        </span>
        <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] text-slate-400 sm:text-[10px]">
          /100
        </span>
      </div>
    </div>
  );
}

function ScoreCard({
  scan,
  active,
  onSelect,
}: {
  scan: Scan;
  active: boolean;
  onSelect: () => void;
}) {
  const Icon = scan.icon;
  const value = useCountUp(scan.score, active);

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: EASE }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      aria-pressed={active}
      className={cn(
        "group relative flex flex-col gap-4 rounded-2xl border bg-white p-4 text-left outline-none transition-all duration-300 sm:p-5",
        "focus-visible:ring-[3px] focus-visible:ring-blue-500/25",
        active
          ? "border-slate-200 shadow-lift ring-1 ring-slate-900/[0.04]"
          : "border-slate-200/80 opacity-80 shadow-soft hover:opacity-100",
      )}
    >
      <AnimatePresence>
        {active ? (
          <motion.span
            layoutId="score-card-glow"
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-2xl bg-[radial-gradient(120%_80%_at_50%_0%,rgba(16,185,129,0.10),transparent_60%)]"
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
          />
        ) : null}
      </AnimatePresence>

      <div className="relative flex items-start justify-between gap-2">
        <div className="flex min-w-0 flex-col gap-1">
          <span className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">
            <Icon className="size-3.5 text-slate-400" />
            {scan.title}
          </span>
          <span
            className={cn(
              "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold",
              scan.statusTone === "emerald"
                ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/15"
                : "bg-amber-50 text-amber-700 ring-1 ring-amber-600/15",
            )}
          >
            <Check className="size-3" strokeWidth={3} />
            {scan.status}
          </span>
        </div>
      </div>

      <div className="relative flex items-center gap-3 sm:gap-4">
        <ScoreGauge score={value} active={active} id={scan.id} />
        <div className="min-w-0">
          <p className="font-display text-2xl font-extrabold leading-none text-slate-900 tabular-nums sm:text-3xl">
            {value}
            <span className="ml-0.5 text-sm font-bold text-slate-300">/100</span>
          </p>
          <p className="text-pretty mt-1.5 text-[11px] leading-snug text-slate-500 sm:text-xs">
            {scan.caption}
          </p>
        </div>
      </div>

      <ul className="relative flex flex-col gap-1.5 border-t border-slate-100 pt-3">
        {scan.chips.map((chip) => (
          <li
            key={chip}
            className="flex items-center gap-2 text-[11px] font-medium text-slate-500 sm:text-xs"
          >
            <span className="grid size-4 place-items-center rounded-full bg-emerald-50 text-emerald-600">
              <Check className="size-2.5" strokeWidth={3.5} />
            </span>
            {chip}
          </li>
        ))}
      </ul>
    </motion.button>
  );
}

function TerminalPanel({ scan, runKey }: { scan: Scan; runKey: number }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-950 shadow-lift">
      <div className="flex items-center gap-2 border-b border-white/10 bg-slate-900/70 px-4 py-3">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="truncate pl-2 font-mono text-[11px] text-slate-400">
          ~/my-ai-saas — ai-guard scan
        </span>
      </div>

      <div className="flex-1 space-y-2 p-4 font-mono text-[11.5px] leading-relaxed sm:p-5 sm:text-[13px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${scan.id}-${runKey}`}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            variants={{ show: { transition: { staggerChildren: 0.09 } } }}
          >
            {scan.lines.map((line, index) => (
              <motion.p
                key={`${line.text}-${index}`}
                variants={{
                  hidden: { opacity: 0, x: -6 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.28, ease: "easeOut" },
                  },
                }}
                className={cn(
                  "flex gap-2",
                  line.kind === "cmd" && "text-slate-100",
                  line.kind === "ok" && "text-emerald-400",
                  line.kind === "warn" && "text-amber-400",
                  line.kind === "out" && "text-slate-400",
                )}
              >
                {line.kind === "ok" ? (
                  <Check className="mt-[3px] size-3 shrink-0" strokeWidth={3} />
                ) : null}
                <span className="min-w-0 break-words">{line.text}</span>
                {index === scan.lines.length - 1 ? (
                  <span className="caret inline-block h-3.5 w-[7px] shrink-0 translate-y-[3px] bg-blue-400" />
                ) : null}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export function ScorePreview() {
  const [active, setActive] = useState<ScanId>("security");
  const [runKey, setRunKey] = useState(0);
  const inViewRef = useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, amount: 0.25 });

  const scan = SCANS[active];

  return (
    <section
      id="preview"
      ref={inViewRef}
      className="relative scroll-mt-24 border-y border-slate-100 bg-slate-50/70 py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-dot-soft mask-fade-radial opacity-60"
      />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-600 shadow-soft">
            <span className="size-1.5 rounded-full bg-emerald-500" />
            Live scan preview
          </span>
          <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Two scores. One command. Zero guesswork.
          </h2>
          <p className="text-pretty mt-4 text-base leading-relaxed text-slate-500">
            Every scan returns a security grade and a legal exposure grade, so
            you know exactly what is safe to ship and what a regulator would
            flag first.
          </p>
        </div>

        <div className="mt-12 overflow-hidden rounded-[22px] border border-slate-200 bg-white p-3 shadow-lift sm:p-4 lg:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div
              role="tablist"
              aria-label="Scan type"
              className="inline-flex w-full gap-1 rounded-xl bg-slate-100 p-1 sm:w-auto"
            >
              {(Object.keys(SCANS) as ScanId[]).map((id) => {
                const item = SCANS[id];
                const isActive = active === id;
                return (
                  <button
                    key={id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActive(id)}
                    className={cn(
                      "relative flex-1 rounded-lg px-3.5 py-2 text-xs font-semibold transition-colors duration-200 sm:flex-none sm:px-4 sm:text-sm",
                      isActive
                        ? "text-slate-900"
                        : "text-slate-500 hover:text-slate-700",
                    )}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="scan-tab"
                        className="absolute inset-0 rounded-lg bg-white shadow-sm"
                        transition={{ type: "spring", stiffness: 340, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.tab}</span>
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setRunKey((key) => key + 1)}
              className="inline-flex w-fit items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-xs transition-colors duration-200 hover:border-slate-300 hover:text-slate-900"
            >
              <RefreshCw className="size-3.5" />
              Re-run scan
            </button>
          </div>

          <div className="grid gap-3 lg:grid-cols-[1.05fr_0.95fr] lg:gap-4">
            <TerminalPanel scan={scan} runKey={runKey} />

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {(Object.keys(SCANS) as ScanId[]).map((id) => (
                <ScoreCard
                  key={id}
                  scan={SCANS[id]}
                  active={active === id}
                  onSelect={() => setActive(id)}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.p
              key={scan.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE }}
              className="mt-4 text-center text-xs text-slate-500"
            >
              Scan completed in 6.4s · 148 files · 0 critical issues ·{" "}
              <span className="font-semibold text-slate-700">
                runs entirely on your machine
              </span>
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

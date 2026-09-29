import { AnimatePresence, animate, motion, useInView } from "framer-motion";
import {
  ArrowUpRight,
  Check,
  Gauge,
  Terminal as TerminalIcon,
  Wand2,
  Zap,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { BrandLockup } from "@/components/landing/Brand";
import { CommandBar } from "@/components/landing/CommandBar";
import { EASE } from "@/components/landing/motion";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router";

const INIT_LINES = [
  { text: "jailbreakr whoami", kind: "cmd" as const },
  { text: "Authenticated as developer", kind: "out" as const },
  { text: "Project: my-ai-saas (24 AI surfaces)", kind: "out" as const },
  { text: "Last full scan: 2 hours ago — all clear", kind: "ok" as const },
];

type ScanId = "security" | "legal";

type Line = { text: string; kind: "cmd" | "out" | "ok" | "warn" };

const REPORTS: Record<
  ScanId,
  { score: number; label: string; status: string; lines: Line[]; fixes: { title: string; detail: string }[] }
> = {
  security: {
    score: 94,
    label: "Vulnerability Score",
    status: "Low Risk",
    lines: [
      { text: "jailbreakr scan --deep", kind: "cmd" },
      { text: "Indexed 148 files · 24 AI surface routes", kind: "out" },
      { text: "Fuzzing 12 system prompts (1,240 payloads)", kind: "out" },
      { text: "2 prompt-injection vectors found in /api/chat", kind: "warn" },
      { text: "Patching input guards + retry limits", kind: "ok" },
      { text: "Vulnerability score: 94/100 — LOW RISK", kind: "ok" },
    ],
    fixes: [
      {
        title: "Sanitize untrusted user input before model calls",
        detail: "Route handler /api/chat/route.ts · injection vector #1",
      },
      {
        title: "Rate-limit per-session model requests",
        detail: "Middleware /middleware.ts · abuse guard missing",
      },
    ],
  },
  legal: {
    score: 88,
    label: "Legal Risk Score",
    status: "Compliant",
    lines: [
      { text: "jailbreakr scan --legal", kind: "cmd" },
      { text: "Auditing 24 AI surfaces for disclosure gaps", kind: "out" },
      { text: "Checking training-data & copyright exposure", kind: "out" },
      { text: "1 advisory: AI disclaimer missing on /pricing", kind: "warn" },
      { text: "Drafting disclaimer block for review", kind: "ok" },
      { text: "Legal risk score: 88/100 — COMPLIANT", kind: "ok" },
    ],
    fixes: [
      {
        title: "Add AI-output disclaimer to marketing pages",
        detail: "Page /pricing · disclosure gap",
      },
      {
        title: "Rotate the exposed OpenAI-style API key",
        detail: "Commit 4f2a9c1 · secret detected in history",
      },
    ],
  },
};

function DashboardScoreCard({
  id,
  scan,
  active,
  onSelect,
}: {
  id: ScanId;
  scan: { score: number; label: string; status: string };
  active: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, scan.score, {
      duration: 1.1,
      ease: EASE,
      onUpdate: (latest) => setValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, scan.score]);

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onSelect}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.99 }}
      aria-pressed={active}
      className={cn(
        "flex flex-col gap-4 rounded-2xl border bg-card p-5 text-left outline-none transition-all duration-300",
        "focus-visible:ring-[3px] focus-visible:ring-indigo-500/25",
        active
          ? "border-white/15 shadow-lift"
          : "border-white/5 opacity-80 shadow-soft hover:opacity-100",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
          {scan.label}
        </span>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
          <Check className="size-3" strokeWidth={3} />
          {scan.status}
        </span>
      </div>
      <div className="flex items-end gap-2">
        <span className="font-display text-4xl font-extrabold leading-none text-slate-100 tabular-nums">
          {value}
        </span>
        <span className="pb-1 text-sm font-bold text-slate-600">/100</span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${scan.score}%` } : {}}
          transition={{ duration: 1.1, ease: EASE }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-teal-500"
        />
      </div>
      <p className="text-xs text-slate-500">
        {active ? "Shown in the console →" : "Tap to view in console"}
      </p>
    </motion.button>
  );
}

function Terminal({ lines }: { lines: Line[] }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-950 shadow-lift">
      <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400/80" />
          <span className="size-2.5 rounded-full bg-amber-400/80" />
          <span className="size-2.5 rounded-full bg-emerald-400/80" />
        </span>
        <span className="truncate pl-2 font-mono text-[11px] text-slate-500">
          jailbreakr dashboard — live session
        </span>
      </div>
      <div className="min-h-[220px] flex-1 space-y-2 p-4 font-mono text-[11.5px] leading-relaxed sm:p-5 sm:text-[13px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={lines.map((l) => l.text).join("|").slice(0, 80) + lines.length}
            initial="hidden"
            animate="show"
            exit={{ opacity: 0 }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          >
            {lines.map((line, index) => (
              <motion.p
                key={`${line.text}-${index}`}
                variants={{
                  hidden: { opacity: 0, x: -6 },
                  show: {
                    opacity: 1,
                    x: 0,
                    transition: { duration: 0.26, ease: "easeOut" },
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
                {line.kind === "cmd" ? (
                  <span className="select-none text-emerald-400">$</span>
                ) : null}
                <span className="min-w-0 break-words">{line.text}</span>
                {index === lines.length - 1 ? (
                  <span className="caret inline-block h-3.5 w-[7px] shrink-0 translate-y-[3px] bg-indigo-400" />
                ) : null}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, signOut, isLoading } = useAuth();
  const navigate = useNavigate();
  const [active, setActive] = useState<ScanId>("security");
  const [lines, setLines] = useState<Line[]>(INIT_LINES);
  const [proRequested, setProRequested] = useState(false);
  const [proPending, setProPending] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const runScan = (id: ScanId) => {
    setActive(id);
    setLines(REPORTS[id].lines);
  };

  const requestPro = () => {
    if (proRequested || proPending) return;
    setProPending(true);
    window.setTimeout(() => {
      setProRequested(true);
      setProPending(false);
    }, 900);
  };

  const scan = REPORTS[active];

  if (isLoading) {
    return (
      <main className="grid min-h-screen place-items-center bg-[#070b14]">
        <div className="animate-pulse text-sm text-muted-foreground">
          Loading your workspace…
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#070b14] text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.16),transparent_65%)]"
      />

      <header className="border-b border-white/5">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <BrandLockup />
          <div className="flex items-center gap-2">
            {user?.email ? (
              <span className="hidden rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs font-medium text-slate-300 sm:inline-block">
                {user.email}
              </span>
            ) : null}
            <Button
              variant="outline"
              onClick={handleSignOut}
              className="border-white/10 bg-white/[0.03] text-slate-300 hover:bg-white/10 hover:text-white"
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="text-sm font-medium text-slate-400">
              Developer workspace
            </p>
            <h1 className="mt-1 font-display text-3xl font-extrabold tracking-tight text-slate-100">
              {user?.name ? `Welcome back, ${user.name}` : "Welcome back"}
            </h1>
          </div>
          <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-card px-4 py-2.5 shadow-soft">
            <Gauge className="size-4 text-emerald-400" />
            <p className="text-xs text-slate-400">
              Last scan <span className="font-semibold text-slate-200">2h ago</span> ·
              0 critical findings
            </p>
          </div>
        </motion.div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <DashboardScoreCard
            id="security"
            scan={REPORTS.security}
            active={active === "security"}
            onSelect={() => runScan("security")}
          />
          <DashboardScoreCard
            id="legal"
            scan={REPORTS.legal}
            active={active === "legal"}
            onSelect={() => runScan("legal")}
          />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
            className="rounded-2xl border border-indigo-500/20 bg-gradient-to-b from-indigo-500/[0.08] to-transparent p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-indigo-500/15 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em] text-indigo-300 ring-1 ring-indigo-500/30">
                <Zap className="size-3" />
                Pro
              </span>
              {proRequested ? (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-400">
                  <Check className="size-3.5" strokeWidth={3} />
                  Requested
                </span>
              ) : null}
            </div>
            <h2 className="mt-4 font-display text-lg font-bold tracking-tight text-slate-100">
              One-Command Auto-Fix
            </h2>
            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
              Patch every finding automatically from your terminal, then re-scan
              to confirm both scores stay green.
            </p>
            <Button
              onClick={requestPro}
              disabled={proRequested || proPending}
              className={cn(
                "mt-5 h-10 w-full rounded-xl text-sm font-semibold",
                proRequested
                  ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30 hover:bg-emerald-500/15"
                  : "bg-gradient-to-b from-indigo-400 to-indigo-600 text-white shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)] hover:from-indigo-300 hover:to-indigo-500",
              )}
            >
              {proRequested ? (
                "Auto-fix enabled"
              ) : proPending ? (
                "Requesting…"
              ) : (
                <>
                  <Wand2 className="size-4" />
                  Request auto-fix access
                </>
              )}
            </Button>
          </motion.div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14, ease: EASE }}
          >
            <Terminal lines={lines} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.18, ease: EASE }}
            className="rounded-2xl border border-white/10 bg-card p-5 shadow-soft"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-display text-base font-bold tracking-tight text-slate-100">
                Recommended fixes
              </h2>
              <span className="rounded-full bg-white/5 px-2 py-0.5 text-[11px] font-semibold text-slate-400">
                {active === "security" ? "Security" : "Legal"}
              </span>
            </div>
            <ul className="mt-4 flex flex-col gap-3">
              {scan.fixes.map((fix) => (
                <li
                  key={fix.title}
                  className="flex items-start gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3.5"
                >
                  <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-lg bg-amber-500/10 text-amber-400">
                    <Wand2 className="size-3.5" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold leading-snug text-slate-200">
                      {fix.title}
                    </p>
                    <p className="mt-0.5 truncate font-mono text-[11px] text-slate-500">
                      {fix.detail}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <CommandBar
              command="npx jailbreakr fix --apply"
              tone="glass"
              className="mt-5"
            />
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              Auto-fix is a Pro feature. Request access and we&apos;ll unlock it
              on your CLI key within one business day.
            </p>
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-1.5 text-xs text-slate-500"
        >
          Runs entirely on your machine
          <ArrowUpRight className="size-3.5" />
          <TerminalIcon className="size-3.5" />
        </motion.p>
      </div>
    </main>
  );
}

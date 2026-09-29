import { motion } from "framer-motion";
import { FileWarning, ShieldOff, Wand2, Zap } from "lucide-react";

import { cn } from "@/lib/utils";
import { EASE, fadeUp, staggerParent } from "./motion";

const FEATURES = [
  {
    icon: ShieldOff,
    title: "Prompt Injection Guard",
    description:
      "Automatically scans route handlers and system prompts to block malicious inputs before they ever reach your model.",
    accent: "indigo" as const,
  },
  {
    icon: FileWarning,
    title: "Legal Liability Audit",
    description:
      "Flags missing AI disclaimers, hallucination risks, and data privacy gaps that turn into lawsuits at scale.",
    accent: "emerald" as const,
  },
  {
    icon: Wand2,
    title: "One-Command Auto-Fix (Pro)",
    description:
      "Don't just find vulnerabilities — run auto-fix commands in your terminal to patch code instantly.",
    accent: "indigo" as const,
  },
];

const ACCENTS = {
  indigo: {
    iconWrap: "bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/25",
  },
  emerald: {
    iconWrap: "bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/25",
  },
};

export function Features() {
  return (
    <section id="features" className="relative scroll-mt-24 py-20 lg:py-24">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300"
          >
            What you get
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl"
          >
            Security and legal reviews that used to take weeks
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-pretty mt-4 text-base leading-relaxed text-slate-400"
          >
            Everything a seed-stage team needs to ship AI features without
            betting the company on a single bad prompt.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {FEATURES.map(({ icon: Icon, title, description, accent }) => (
            <motion.article
              key={title}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="group relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-soft transition-colors duration-300 hover:border-white/20"
            >
              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <span
                className={cn(
                  "grid size-11 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-110",
                  ACCENTS[accent].iconWrap,
                )}
              >
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-bold tracking-tight text-slate-100">
                {title}
              </h3>
              <p className="text-pretty mt-2 text-sm leading-relaxed text-slate-400">
                {description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

const STEPS: {
  number: string;
  title: string;
  body: string;
  code: string | null;
  pro?: boolean;
  codeNote?: string;
}[] = [
  {
    number: "01",
    title: "Install the CLI",
    body: "Zero complex setup — just drop in your CLI key and scan. No dependencies added to your repo.",
    code: "npx jailbreakr scan",
  },
  {
    number: "02",
    title: "Get your scores",
    body: "A vulnerability score and a legal risk score appear in seconds, with the exact lines that caused each finding.",
    code: null,
  },
  {
    number: "03",
    title: "Auto-patch before launch",
    pro: true,
    body: "Pro users apply suggested fixes with a single command and ship knowing both scores are green.",
    code: "npx jailbreakr fix --apply",
    codeNote: "(Requires Pro Key)",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 border-t border-white/5 py-20 lg:py-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-dot-soft mask-fade-radial opacity-40"
      />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-semibold text-slate-300"
          >
            Three steps
          </motion.span>
          <motion.h2
            variants={fadeUp}
            className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl"
          >
            From `npm install` to a clean bill of health
          </motion.h2>
          <motion.p variants={fadeUp} className="text-pretty mt-4 text-base leading-relaxed text-slate-400">
            Every scan ends with clear next steps — see it, understand it, fix it.
          </motion.p>
        </motion.div>

        <motion.ol
          variants={staggerParent(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-14 grid gap-5 md:grid-cols-3"
        >
          {STEPS.map((step) => (
            <motion.li
              key={step.number}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-card p-6 shadow-soft transition-colors duration-300 hover:border-indigo-500/30"
            >
              <span className="font-display text-sm font-extrabold tracking-[0.2em] text-indigo-400">
                {step.number}
              </span>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold tracking-tight text-slate-100">
                  {step.title}
                </h3>
                {step.pro ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-indigo-500/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-indigo-300 ring-1 ring-indigo-500/30">
                    <Zap className="size-3" />
                    Pro Feature
                  </span>
                ) : null}
              </div>
              <p className="text-pretty mt-2 text-sm leading-relaxed text-slate-400">
                {step.body}
              </p>
              {step.code ? (
                <code className="mt-4 block whitespace-normal break-words rounded-lg border border-white/10 bg-slate-950 px-3 py-2 font-mono text-xs leading-relaxed text-emerald-300">
                  {step.code}
                  {step.codeNote ? (
                    <span className="text-slate-500"> {step.codeNote}</span>
                  ) : null}
                </code>
              ) : null}
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

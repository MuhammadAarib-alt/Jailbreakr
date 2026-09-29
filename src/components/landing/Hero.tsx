import { motion } from "framer-motion";
import { CreditCard, Terminal, Zap } from "lucide-react";

import { CommandBar } from "./CommandBar";
import { INSTALL_COMMAND, WaitlistForm } from "./WaitlistForm";
import { EASE, staggerParent } from "./motion";

const TRUST = [
  { icon: Zap, label: "100% Free Audit" },
  { icon: Terminal, label: "Works via npx" },
  { icon: CreditCard, label: "No Credit Card Required" },
];

const AVATARS = [
  { initials: "AK", tone: "bg-indigo-500" },
  { initials: "JM", tone: "bg-emerald-500" },
  { initials: "RS", tone: "bg-sky-500" },
  { initials: "LP", tone: "bg-violet-500" },
];

type HeroProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  status: "idle" | "loading";
};

export function Hero({
  email,
  onEmailChange,
  onSubmit,
  error,
  status,
}: HeroProps) {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* ambient background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-grid-soft mask-fade-b opacity-60"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-18rem] -z-10 h-[34rem] w-[68rem] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.22),rgba(99,102,241,0)_62%)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10rem] top-24 -z-10 h-72 w-72 rounded-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.12),rgba(16,185,129,0)_65%)] blur-2xl"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pt-20 lg:pb-28 lg:pt-24">
        <motion.div
          variants={staggerParent(0.09)}
          initial="hidden"
          animate="show"
          className="mx-auto flex max-w-3xl flex-col items-center text-center"
        >
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 14, scale: 0.96 },
              show: {
                opacity: 1,
                y: 0,
                scale: 1,
                transition: { duration: 0.6, ease: EASE },
              },
            }}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] py-1.5 pl-2.5 pr-4 shadow-soft backdrop-blur"
          >
            <span className="grid size-6 place-items-center rounded-full bg-emerald-500/10 text-[13px] leading-none">
              🔒
            </span>
            <span className="text-xs font-semibold tracking-tight text-slate-300 sm:text-[13px]">
              Built for Bootstrapped &amp; Seed-Stage AI Founders
            </span>
          </motion.div>

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
              show: {
                opacity: 1,
                y: 0,
                filter: "blur(0px)",
                transition: { duration: 0.85, ease: EASE },
              },
            }}
            className="mt-7 text-balance text-[2.1rem] font-extrabold leading-[1.08] tracking-tight text-slate-100 sm:text-5xl lg:text-[3.6rem]"
          >
            Ship Safe AI SaaS Today —{" "}
            <span className="relative mx-1 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-300 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
                Without Getting Hacked or Sued.
              </span>
              <span
                aria-hidden
                className="absolute inset-x-0 bottom-1 z-0 h-3 rounded-full bg-indigo-500/20"
              />
            </span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            className="text-pretty mt-6 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            Jailbreakr runs an instant terminal scan that detects prompt
            injections, data leaks, and legal risks in your AI startup — then
            auto-fixes them before launch, right from your terminal.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            className="mt-9 w-full max-w-xl"
          >
            <WaitlistForm
              email={email}
              onEmailChange={onEmailChange}
              onSubmit={onSubmit}
              error={error}
              status={status}
            />

            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {TRUST.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500"
                >
                  <Icon className="size-3.5 text-emerald-400" />
                  {label}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 16 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.7, ease: EASE },
              },
            }}
            className="mt-10 w-full max-w-xl"
          >
            <CommandBar command={INSTALL_COMMAND} className="text-left" />
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="flex -space-x-2">
                {AVATARS.map(({ initials, tone }) => (
                  <span
                    key={initials}
                    className={`grid size-7 place-items-center rounded-full text-[10px] font-bold text-white ring-2 ring-[#070b14] ${tone}`}
                  >
                    {initials}
                  </span>
                ))}
              </span>
              <p className="text-xs text-slate-500">
                <span className="font-semibold text-slate-200">1,284</span>{" "}
                indie builders already on the list
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

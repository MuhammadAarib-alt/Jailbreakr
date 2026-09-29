import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { CommandBar } from "./CommandBar";
import { INSTALL_COMMAND, WaitlistForm } from "./WaitlistForm";
import { EASE } from "./motion";

type FinalCtaProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  error: string | null;
  status: "idle" | "loading";
};

export function FinalCta({
  email,
  onEmailChange,
  onSubmit,
  error,
  status,
}: FinalCtaProps) {
  return (
    <section
      id="waitlist"
      className="relative scroll-mt-24 overflow-hidden border-t border-white/5 py-20 lg:py-28"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-20 bg-grid-soft mask-fade-b opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[26rem] w-[60rem] max-w-[130vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.18),rgba(99,102,241,0)_60%)] blur-2xl"
      />

      <div className="mx-auto w-full max-w-3xl px-4 text-center sm:px-6">
        <motion.span
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5, ease: EASE }}
          className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-300"
        >
          <ShieldCheck className="size-3.5" />
          Join 1,284 builders scanning before they ship
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-6 text-balance text-3xl font-extrabold tracking-tight text-slate-100 sm:text-4xl"
        >
          Get your terminal access before your competitors get their funding
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="text-pretty mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-400"
        >
          Early access opens in small weekly batches. Join the waitlist and
          we&apos;ll send your invite, CLI key, and a Pro auto-fix trial the
          moment your spot unlocks.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, delay: 0.16, ease: EASE }}
          className="mx-auto mt-9 w-full max-w-xl"
        >
          <WaitlistForm
            email={email}
            onEmailChange={onEmailChange}
            onSubmit={onSubmit}
            error={error}
            status={status}
            inputId="waitlist-email-footer"
          />
          <p className="mt-4 text-xs text-slate-500">
            No spam, no credit card. One email when it&apos;s your turn.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mx-auto mt-10 w-full max-w-md"
        >
          <CommandBar command={INSTALL_COMMAND} tone="glass" />
        </motion.div>
      </div>
    </section>
  );
}

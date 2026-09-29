import { AnimatePresence, motion } from "framer-motion";
import { Check, Terminal, X } from "lucide-react";
import { useEffect } from "react";

import { BrandMark } from "./Brand";
import { EASE } from "./motion";

type WaitlistSuccessDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  email: string;
  position: number;
};

export function WaitlistSuccessDialog({
  open,
  onOpenChange,
  email,
  position,
}: WaitlistSuccessDialogProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (event: KeyboardEvent) => {
      if (event.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          key="waitlist-success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-[#04060c]/80 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-success-title"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: 26, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.45, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-card shadow-lift"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-[radial-gradient(80%_100%_at_50%_0%,rgba(16,185,129,0.18),transparent_70%)]"
            />

            <button
              type="button"
              onClick={() => onOpenChange(false)}
              aria-label="Close dialog"
              className="absolute right-4 top-4 grid size-8 place-items-center rounded-lg text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-200"
            >
              <X className="size-4" />
            </button>

            <div className="relative flex flex-col items-center px-6 pb-8 pt-10 text-center sm:px-8">
              <motion.span
                initial={{ scale: 0, rotate: -30 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 18,
                  delay: 0.1,
                }}
                className="grid size-16 place-items-center rounded-2xl bg-emerald-500/15 ring-1 ring-emerald-500/30"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.28, type: "spring", stiffness: 300, damping: 16 }}
                  className="grid size-10 place-items-center rounded-full bg-emerald-500 text-white shadow-[0_8px_24px_-6px_rgba(16,185,129,0.8)]"
                >
                  <Check className="size-5" strokeWidth={3} />
                </motion.span>
              </motion.span>

              <h2
                id="waitlist-success-title"
                className="mt-6 font-display text-2xl font-extrabold tracking-tight text-slate-100"
              >
                You&apos;re on the list
              </h2>
              <p className="text-pretty mt-2 text-sm leading-relaxed text-slate-400">
                We&apos;ve reserved a spot for{" "}
                <span className="font-semibold text-slate-200">{email}</span>.
                Watch your inbox — terminal invites go out in weekly batches.
              </p>

              <div className="mt-6 grid w-full grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/[0.03] p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-500">
                    Your position
                  </p>
                  <p className="mt-1 font-display text-xl font-extrabold text-slate-100 tabular-nums">
                    #{position.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-400/80">
                    Early perk
                  </p>
                  <p className="mt-1 font-display text-xl font-extrabold text-slate-100">
                    Pro trial
                  </p>
                </div>
              </div>

              <div className="mt-4 w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-left font-mono text-xs text-slate-400">
                <span className="mr-2 text-emerald-400">$</span>
                jailbreakr invite --email {email}
              </div>

              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="mt-6 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)] transition-all duration-200 hover:bg-indigo-400 focus-visible:ring-[3px] focus-visible:ring-indigo-400/40 focus-visible:outline-none"
              >
                <Terminal className="size-4" />
                Back to the terminal
              </button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

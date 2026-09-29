import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import type { FormEvent } from "react";

import { cn } from "@/lib/utils";

export const INSTALL_COMMAND = "npx jailbreakr scan";

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim());
}

type WaitlistFormProps = {
  email: string;
  onEmailChange: (value: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  error?: string | null;
  status?: "idle" | "loading";
  tone?: "dark" | "glass";
  ctaLabel?: string;
  className?: string;
  inputId?: string;
};

export function WaitlistForm({
  email,
  onEmailChange,
  onSubmit,
  error,
  status = "idle",
  tone = "dark",
  ctaLabel = "Get Free Terminal Access",
  className,
  inputId = "waitlist-email",
}: WaitlistFormProps) {
  const isGlass = tone === "glass";
  const busy = status === "loading";

  return (
    <form onSubmit={onSubmit} className={cn("w-full", className)} noValidate>
      <motion.div
        animate={error ? { x: [0, -8, 7, -5, 4, 0] } : { x: 0 }}
        transition={{ duration: 0.42, ease: "easeInOut" }}
        className="flex flex-col gap-2.5 sm:flex-row sm:gap-3"
      >
        <div className="relative flex-1">
          <label htmlFor={inputId} className="sr-only">
            Developer email
          </label>
          <input
            id={inputId}
            type="email"
            name="email"
            inputMode="email"
            autoComplete="email"
            placeholder="Enter your developer email"
            value={email}
            onChange={(event) => onEmailChange(event.target.value)}
            aria-invalid={Boolean(error)}
            aria-describedby={error ? `${inputId}-error` : undefined}
            className={cn(
              "h-12 w-full rounded-xl border bg-card px-4 text-base text-slate-100 shadow-xs outline-none transition-all duration-200 placeholder:text-slate-500 sm:text-sm",
              "focus-visible:ring-[3px] focus-visible:ring-indigo-500/25",
              error
                ? "border-rose-500/60 focus-visible:border-rose-400"
                : "border-white/10 hover:border-white/20 focus-visible:border-indigo-400",
              isGlass &&
                "border-white/15 bg-white/[0.04] backdrop-blur hover:border-white/25",
            )}
          />
        </div>

        <motion.button
          type="submit"
          disabled={busy}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98, y: 0 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className={cn(
            "group relative inline-flex h-12 shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl px-6 text-sm font-semibold text-white",
            "bg-gradient-to-b from-indigo-400 to-indigo-600 shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)]",
            "transition-[box-shadow,filter] duration-200 hover:from-indigo-300 hover:to-indigo-500 hover:shadow-[0_16px_40px_-12px_rgba(99,102,241,1)]",
            "focus-visible:ring-[3px] focus-visible:ring-indigo-400/40 focus-visible:outline-none",
            "disabled:pointer-events-none disabled:opacity-70",
          )}
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
          {busy ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <ArrowRight className="size-4" />
          )}
          {busy ? "Securing your spot" : ctaLabel}
        </motion.button>
      </motion.div>

      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${inputId}-error`}
            role="alert"
            initial={{ opacity: 0, y: -6, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -6, height: 0 }}
            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
            className="pt-2 text-left text-xs font-medium text-rose-400"
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </form>
  );
}

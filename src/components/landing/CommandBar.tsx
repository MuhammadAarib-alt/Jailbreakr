import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type CommandBarProps = {
  command: string;
  tone?: "dark" | "glass";
  className?: string;
  showCopied?: boolean;
};

export function CommandBar({
  command,
  tone = "dark",
  className,
  showCopied = true,
}: CommandBarProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      /* clipboard unavailable — the command stays selectable */
    }
    setCopied(true);
  }, [command]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const isGlass = tone === "glass";

  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3",
        isGlass
          ? "border-white/10 bg-white/[0.04] text-slate-100 backdrop-blur"
          : "border-white/10 bg-slate-950 text-slate-200",
        className,
      )}
    >
      <span
        className="select-none font-mono text-xs font-semibold text-emerald-400 sm:text-sm"
        aria-hidden
      >
        $
      </span>
      <code className="min-w-0 flex-1 truncate font-mono text-xs text-slate-300 sm:text-sm">
        {command}
      </code>
      <AnimatePresence initial={false} mode="popLayout">
        {showCopied ? (
          <motion.button
            key={copied ? "copied" : "copy"}
            type="button"
            onClick={copy}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.18 }}
            aria-label={copied ? "Command copied" : "Copy command"}
            className={cn(
              "relative grid size-8 shrink-0 place-items-center rounded-lg border transition-colors duration-200",
              "border-white/10 bg-white/5 text-slate-400 hover:border-white/20 hover:bg-white/10 hover:text-slate-100",
            )}
          >
            {copied ? (
              <Check className="size-4 text-emerald-400" />
            ) : (
              <Copy className="size-4" />
            )}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

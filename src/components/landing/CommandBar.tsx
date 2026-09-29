import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type CommandBarProps = {
  command: string;
  tone?: "light" | "dark";
  className?: string;
  showCopied?: boolean;
};

export function CommandBar({
  command,
  tone = "light",
  className,
  showCopied = true,
}: CommandBarProps) {
  const [copied, setCopied] = useState(false);

  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(command);
    } catch {
      /* clipboard unavailable — the command is still visible to select manually */
    }
    setCopied(true);
  }, [command]);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timer);
  }, [copied]);

  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "group flex items-center gap-2 rounded-xl border px-3 py-2.5 sm:px-4 sm:py-3",
        isDark
          ? "border-white/12 bg-white/[0.06] text-slate-100 backdrop-blur"
          : "border-slate-200 bg-slate-50 text-slate-900",
        className,
      )}
    >
      <span
        className={cn(
          "select-none font-mono text-xs font-semibold sm:text-sm",
          isDark ? "text-emerald-400" : "text-emerald-600",
        )}
        aria-hidden
      >
        $
      </span>
      <code
        className={cn(
          "min-w-0 flex-1 truncate font-mono text-xs sm:text-sm",
          isDark ? "text-slate-100" : "text-slate-700",
        )}
      >
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
              isDark
                ? "border-white/15 bg-white/10 text-slate-200 hover:bg-white/20"
                : "border-slate-200 bg-white text-slate-500 hover:border-slate-300 hover:text-slate-900",
            )}
          >
            {copied ? (
              <Check className="size-4 text-emerald-500" />
            ) : (
              <Copy className="size-4" />
            )}
          </motion.button>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

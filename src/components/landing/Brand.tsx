import { cn } from "@/lib/utils";

const LOGO_URL = "/logo.jpg";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative block size-9 shrink-0 overflow-hidden rounded-[11px] bg-slate-950 ring-1 ring-white/15 shadow-[0_8px_20px_-8px_rgba(99,102,241,0.9)]",
        className,
      )}
    >
      <img
        src={LOGO_URL}
        alt=""
        aria-hidden
        draggable={false}
        className="block size-full object-cover"
      />
    </span>
  );
}

export function BrandLockup({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <BrandMark />
      <span
        className={cn(
          "font-display text-[15px] font-extrabold tracking-tight",
          tone === "dark" ? "text-white" : "text-slate-100",
        )}
      >
        Jailbreakr
      </span>
    </span>
  );
}

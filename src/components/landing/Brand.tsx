import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "relative grid size-9 place-items-center rounded-[11px] bg-gradient-to-br from-blue-500 to-indigo-600 shadow-[0_6px_16px_-6px_rgba(37,99,235,0.7)]",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
        className="size-5 text-white"
      >
        <path
          d="M12 2.75 4.75 5.6v5.55c0 4.5 2.95 8.6 7.25 10.1 4.3-1.5 7.25-5.6 7.25-10.1V5.6L12 2.75Z"
          fill="currentColor"
          fillOpacity="0.22"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <path
          d="m8.9 11.9 2.2 2.25 4-4.4"
          stroke="currentColor"
          strokeWidth="1.9"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
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
          tone === "dark" ? "text-white" : "text-slate-900",
        )}
      >
        TestMySaaS
      </span>
    </span>
  );
}

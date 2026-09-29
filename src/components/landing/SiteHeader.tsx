import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

import { BrandLockup } from "./Brand";

const NAV_LINKS = [
  { label: "Scan preview", href: "#preview" },
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-0 z-40 w-full border-b border-transparent transition-colors duration-300"
    >
      <div
        className={`absolute inset-0 -z-10 transition-all duration-300 ${
          scrolled
            ? "border-slate-200/80 bg-white/80 backdrop-blur-xl"
            : "border-transparent bg-white/0"
        }`}
      />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px]">
        <a
          href="#top"
          className="rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-blue-500/25"
          aria-label="TestMySaaS home"
        >
          <BrandLockup />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-500 transition-colors duration-200 hover:bg-slate-100/80 hover:text-slate-900"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <motion.a
          href="#waitlist"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          transition={{ type: "spring", stiffness: 420, damping: 26 }}
          className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 text-sm font-semibold text-white shadow-sm outline-none transition-colors duration-200 hover:bg-blue-600 focus-visible:ring-[3px] focus-visible:ring-blue-500/30 sm:px-4"
        >
          Join Waitlist
          <ArrowUpRight className="size-4" />
        </motion.a>
      </div>
    </motion.header>
  );
}

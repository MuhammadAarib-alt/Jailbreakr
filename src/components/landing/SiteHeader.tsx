import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { ArrowUpRight, LogIn } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";

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
            ? "border-white/10 bg-[#070b14]/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      />
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[72px]">
        <a
          href="#top"
          className="rounded-lg outline-none focus-visible:ring-[3px] focus-visible:ring-indigo-500/30"
          aria-label="Jailbreakr home"
        >
          <BrandLockup />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors duration-200 hover:bg-white/5 hover:text-slate-100"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/auth"
            className="hidden items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white sm:inline-flex"
          >
            <LogIn className="size-4" />
            Sign in
          </Link>
          <motion.a
            href="#waitlist"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 420, damping: 26 }}
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-indigo-500 px-3.5 text-sm font-semibold text-white shadow-[0_10px_28px_-14px_rgba(99,102,241,1)] outline-none transition-colors duration-200 hover:bg-indigo-400 focus-visible:ring-[3px] focus-visible:ring-indigo-400/40 sm:px-4"
          >
            Join Waitlist
            <ArrowUpRight className="size-4" />
          </motion.a>
        </div>
      </div>
    </motion.header>
  );
}

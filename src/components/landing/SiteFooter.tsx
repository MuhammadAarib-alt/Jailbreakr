import { BrandLockup } from "./Brand";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-5 px-4 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <BrandLockup />
        <p className="max-w-md text-xs leading-relaxed text-slate-500">
          © {new Date().getFullYear()} Jailbreakr, Inc. All rights reserved.
          Jailbreakr provides automated security and legal signals for
          developers and is not a substitute for professional legal advice or a
          formal security audit.
        </p>
        <nav className="flex items-center gap-5 text-xs font-medium text-slate-400">
          <a href="#" className="transition-colors hover:text-slate-100">
            Privacy
          </a>
          <a href="#" className="transition-colors hover:text-slate-100">
            Terms
          </a>
          <a href="#" className="transition-colors hover:text-slate-100">
            Contact
          </a>
        </nav>
      </div>
    </footer>
  );
}

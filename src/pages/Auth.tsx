import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { useAuth } from "@/hooks/use-auth";
import { BrandMark } from "@/components/landing/Brand";
import { EASE } from "@/components/landing/motion";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Mail,
  ShieldCheck,
  UserX,
} from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";

interface AuthProps {
  redirectAfterAuth?: string;
}

function resolveRedirectAfterAuth(
  returnTo: string | null,
  fallback = "/dashboard",
) {
  if (returnTo?.startsWith("/") && !returnTo.startsWith("//")) {
    return returnTo;
  }
  return fallback;
}

function Auth({ redirectAfterAuth }: AuthProps = {}) {
  const { isLoading: authLoading, isAuthenticated, signIn } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirect = resolveRedirectAfterAuth(
    searchParams.get("returnTo"),
    redirectAfterAuth,
  );
  const [step, setStep] = useState<"signIn" | { email: string }>("signIn");
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate(redirect);
    }
  }, [authLoading, isAuthenticated, navigate, redirect]);

  const handleEmailSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      setStep({ email: formData.get("email") as string });
      setIsLoading(false);
    } catch (err) {
      console.error("Email sign-in error:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to send verification code. Please try again.",
      );
      setIsLoading(false);
    }
  };

  const handleOtpSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData(event.currentTarget);
      await signIn("email-otp", formData);
      navigate(redirect);
    } catch (err) {
      console.error("OTP verification error:", err);
      setError("The verification code you entered is incorrect.");
      setIsLoading(false);
      setOtp("");
    }
  };

  const handleGuestLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      await signIn("anonymous");
      navigate(redirect);
    } catch (err) {
      console.error("Guest login error:", err);
      setError(
        `Failed to sign in as guest: ${
          err instanceof Error ? err.message : "Unknown error"
        }`,
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-[#070b14]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-soft mask-fade-b opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14rem] -z-0 h-[30rem] w-[52rem] max-w-[130vw] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.2),rgba(99,102,241,0)_62%)] blur-2xl"
      />

      <div className="relative flex flex-1 items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 18, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="w-full max-w-md"
        >
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-400 transition-colors hover:text-slate-100"
          >
            <ArrowLeft className="size-4" />
            Back to Jailbreakr
          </Link>

          <div className="overflow-hidden rounded-2xl border border-white/10 bg-card shadow-lift">
            {step === "signIn" ? (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <BrandMark />
                  <span className="font-display text-[15px] font-extrabold tracking-tight text-slate-100">
                    Jailbreakr
                  </span>
                </div>

                <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-slate-100">
                  Get started
                </h1>
                <p className="mt-1.5 text-sm text-slate-400">
                  Enter your email to log in or create your account — your scan
                  history and scores stay with it.
                </p>

                <form onSubmit={handleEmailSubmit} className="mt-6">
                  <div className="relative flex items-center gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                      <Input
                        name="email"
                        placeholder="name@example.com"
                        type="email"
                        autoComplete="email"
                        className="h-11 border-white/10 bg-white/[0.03] pl-9 text-slate-100 placeholder:text-slate-500 focus-visible:border-indigo-400 focus-visible:ring-indigo-500/25"
                        disabled={isLoading}
                        required
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.96 }}
                      transition={{ type: "spring", stiffness: 420, damping: 26 }}
                      className="grid size-11 shrink-0 place-items-center rounded-xl bg-gradient-to-b from-indigo-400 to-indigo-600 text-white shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)] transition-colors hover:from-indigo-300 hover:to-indigo-500"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        <ArrowRight className="size-4" />
                      )}
                    </motion.button>
                  </div>

                  {error ? (
                    <p className="mt-3 text-sm text-rose-400">{error}</p>
                  ) : null}

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t border-white/10" />
                      </div>
                      <div className="relative flex justify-center text-[11px] font-semibold uppercase tracking-[0.14em]">
                        <span className="bg-card px-2 text-slate-500">or</span>
                      </div>
                    </div>

                    <Button
                      type="button"
                      variant="outline"
                      className="mt-4 h-11 w-full border-white/10 bg-white/[0.03] text-slate-200 hover:bg-white/10 hover:text-white"
                      onClick={handleGuestLogin}
                      disabled={isLoading}
                    >
                      <UserX className="mr-2 size-4" />
                      Continue as guest
                    </Button>
                  </div>
                </form>
              </div>
            ) : (
              <div className="p-6 sm:p-8">
                <div className="flex items-center gap-3">
                  <BrandMark />
                  <span className="font-display text-[15px] font-extrabold tracking-tight text-slate-100">
                    Jailbreakr
                  </span>
                </div>

                <h1 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-slate-100">
                  Check your email
                </h1>
                <p className="mt-1.5 text-sm text-slate-400">
                  We sent a 6-digit code to{" "}
                  <span className="font-semibold text-slate-200">
                    {step.email}
                  </span>
                  .
                </p>

                <form onSubmit={handleOtpSubmit} className="mt-6">
                  <input type="hidden" name="email" value={step.email} />
                  <input type="hidden" name="code" value={otp} />

                  <div className="flex justify-center">
                    <InputOTP
                      value={otp}
                      onChange={setOtp}
                      maxLength={6}
                      disabled={isLoading}
                      onKeyDown={(e) => {
                        if (
                          e.key === "Enter" &&
                          otp.length === 6 &&
                          !isLoading
                        ) {
                          const form = (e.target as HTMLElement).closest("form");
                          if (form) form.requestSubmit();
                        }
                      }}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {error ? (
                    <p className="mt-3 text-center text-sm text-rose-400">
                      {error}
                    </p>
                  ) : null}

                  <Button
                    type="submit"
                    className="mt-6 h-11 w-full rounded-xl bg-gradient-to-b from-indigo-400 to-indigo-600 text-white shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)] hover:from-indigo-300 hover:to-indigo-500"
                    disabled={isLoading || otp.length !== 6}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 size-4 animate-spin" />
                        Verifying…
                      </>
                    ) : (
                      <>
                        Verify code
                        <ArrowRight className="ml-2 size-4" />
                      </>
                    )}
                  </Button>

                  <div className="mt-3 flex items-center justify-between text-sm">
                    <button
                      type="button"
                      onClick={() => setStep("signIn")}
                      className="text-slate-400 transition-colors hover:text-slate-200"
                      disabled={isLoading}
                    >
                      Use a different email
                    </button>
                    <button
                      type="button"
                      onClick={() => setOtp("")}
                      className="font-medium text-indigo-300 transition-colors hover:text-indigo-200"
                      disabled={isLoading}
                    >
                      Resend code
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="flex items-center justify-center gap-1.5 border-t border-white/10 bg-white/[0.02] px-6 py-4 text-xs text-slate-500">
              <ShieldCheck className="size-3.5 text-emerald-400" />
              Passwordless &amp; secured by one-time codes
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AuthPage(props: AuthProps) {
  return (
    <Suspense fallback={null}>
      <Auth {...props} />
    </Suspense>
  );
}

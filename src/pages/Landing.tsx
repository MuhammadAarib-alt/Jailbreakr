import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";
import type { FormEvent } from "react";

import { FinalCta } from "@/components/landing/FinalCta";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks, Features } from "@/components/landing/Sections";
import { ScorePreview } from "@/components/landing/ScorePreview";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { SiteHeader } from "@/components/landing/SiteHeader";
import {
  WaitlistSuccessDialog,
} from "@/components/landing/WaitlistSuccessDialog";
import { isValidEmail } from "@/components/landing/WaitlistForm";

export default function Landing() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading">("idle");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{ email: string; position: number } | null>(
    null,
  );
  const positionRef = useRef(1284);

  const handleSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      if (status === "loading") return;

      const value = email.trim();
      if (!value) {
        setError("Please enter your developer email to join the waitlist.");
        return;
      }
      if (!isValidEmail(value)) {
        setError("That doesn't look like a valid email address — try again?");
        return;
      }

      setError(null);
      setStatus("loading");

      window.setTimeout(() => {
        positionRef.current += 1;
        setSuccess({ email: value, position: positionRef.current });
        setEmail("");
        setStatus("idle");
      }, 900);
    },
    [email, status],
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex min-h-screen flex-col bg-[#070b14]"
    >
      <SiteHeader />

      <main className="flex-1">
        <Hero
          email={email}
          onEmailChange={(value) => {
            setEmail(value);
            if (error) setError(null);
          }}
          onSubmit={handleSubmit}
          error={error}
          status={status}
        />
        <ScorePreview />
        <Features />
        <HowItWorks />
        <FinalCta
          email={email}
          onEmailChange={(value) => {
            setEmail(value);
            if (error) setError(null);
          }}
          onSubmit={handleSubmit}
          error={error}
          status={status}
        />
      </main>

      <SiteFooter />

      <AnimatePresence>
        {success ? (
          <WaitlistSuccessDialog
            key={success.email + success.position}
            open={Boolean(success)}
            onOpenChange={(open) => {
              if (!open) setSuccess(null);
            }}
            email={success.email}
            position={success.position}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

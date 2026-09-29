import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";
import { Loader2, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";

/**
 * Wraps a route that requires a signed-in user.
 *
 * Signed-out visitors used to be bounced straight to `/auth`, which left them
 * on a bare sign-in form with no idea which page they had asked for or why they
 * were moved. The block is now stated on the page they landed on, and sign-in
 * still returns them to it via `returnTo`. Pass `redirectImmediately` for a
 * route where the bounce really is the better experience.
 */
export function RequireAuth({
  children,
  title = "Sign in to continue",
  description = "This page is only available to signed-in users.",
  redirectImmediately = false,
}: {
  children: ReactNode;
  /** Headline on the blocked screen. */
  title?: string;
  /** Says what the visitor gets by signing in. */
  description?: string;
  /** Skip the explanation and go straight to `/auth`. */
  redirectImmediately?: boolean;
}) {
  const { isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (isLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </main>
    );
  }

  if (!isAuthenticated) {
    const returnTo = `${location.pathname}${location.search}`;
    const signInHref = `/auth?returnTo=${encodeURIComponent(returnTo)}`;

    if (redirectImmediately) {
      return <Navigate to={signInHref} replace />;
    }

    return (
      <main className="flex min-h-screen items-center justify-center bg-[#070b14] p-6">
        <Card className="w-full max-w-md border-white/10 bg-card">
          <CardHeader className="text-center">
            <div className="flex justify-center">
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-500/10 ring-1 ring-indigo-500/25">
                <Lock className="size-5 text-indigo-300" />
              </div>
            </div>
            <CardTitle className="text-xl">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="text-center text-sm text-muted-foreground">
            You'll come straight back to this page once you're signed in.
          </CardContent>
          <CardFooter className="flex flex-col gap-2">
            <Button
              className="h-11 w-full rounded-xl bg-gradient-to-b from-indigo-400 to-indigo-600 text-white shadow-[0_10px_30px_-12px_rgba(99,102,241,0.9)] hover:from-indigo-300 hover:to-indigo-500"
              onClick={() => navigate(signInHref)}
            >
              Sign in
            </Button>
            <Button
              variant="ghost"
              className="w-full text-slate-400 hover:bg-white/5 hover:text-slate-100"
              onClick={() => navigate("/")}
            >
              Back to home
            </Button>
          </CardFooter>
        </Card>
      </main>
    );
  }

  return children;
}

import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Admin Sign in — ANVITH i5" },
      { name: "robots", content: "noindex" },
    ],
  }),
  ssr: false,
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin", replace: true });
    });
  }, [navigate]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const { error } =
      mode === "signin"
        ? await supabase.auth.signInWithPassword({ email, password })
        : await supabase.auth.signUp({ email, password, options: { emailRedirectTo: window.location.origin + "/admin" } });
    setLoading(false);
    if (error) return toast.error(error.message);
    if (mode === "signup") toast.success("Account created. Signing you in…");
    navigate({ to: "/admin", replace: true });
  }

  async function google() {
    const r = await lovable.auth.signInWithOAuth("google", { redirect_uri: window.location.origin + "/admin" });
    if (r.error) toast.error("Google sign-in failed");
  }

  return (
    <div className="grid min-h-screen place-items-center px-6 py-24">
      <div className="w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-3">
          <span className="grid h-10 w-10 place-items-center rounded-sm bg-gradient-gold font-display font-bold text-primary-foreground">A</span>
          <span className="font-display text-lg">ANVITH <span className="text-gradient-gold">i5</span></span>
        </Link>

        <h1 className="mt-8 font-display text-3xl">
          {mode === "signin" ? "Admin sign in" : "Create admin account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {mode === "signin" ? "Manage enquiries, projects and testimonials." : "First account becomes admin after role assignment."}
        </p>

        <form onSubmit={submit} className="glass mt-8 space-y-4 rounded-sm p-6">
          <div>
            <label className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-sm border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">Password</label>
            <input
              type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-sm border border-input bg-background/50 px-4 py-3 text-sm outline-none focus:border-gold"
            />
          </div>
          <button
            type="submit" disabled={loading}
            className="w-full rounded-sm bg-gradient-gold py-3 text-sm font-medium text-primary-foreground disabled:opacity-60"
          >
            {loading ? "…" : mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          onClick={google}
          className="mt-4 w-full rounded-sm hairline py-3 text-sm hover:bg-gold/5"
        >
          Continue with Google
        </button>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {mode === "signin" ? "Need an account? " : "Already registered? "}
          <button onClick={() => setMode(mode === "signin" ? "signup" : "signin")} className="text-gold">
            {mode === "signin" ? "Sign up" : "Sign in"}
          </button>
        </p>
      </div>
    </div>
  );
}

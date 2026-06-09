import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { GoldButton } from "@/components/GoldButton";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — Shan Koe Mee" }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [remember, setRemember] = useState(true);

  return (
    <MobileShell>
      <div className="min-h-screen px-6 pt-14 pb-10 flex flex-col">
        <div className="text-center space-y-2 mb-10">
          <div className="mx-auto w-20 h-20 rounded-full bg-gradient-to-br from-[var(--crimson)] to-[var(--crimson-dark)] border-2 border-[var(--gold)] shadow-gold flex items-center justify-center">
            <span className="font-display text-3xl text-gold-gradient">♛</span>
          </div>
          <h1 className="font-display text-3xl text-gold-gradient">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">Sign in to enter the lounge</p>
        </div>

        <form
          onSubmit={(e) => { e.preventDefault(); navigate({ to: "/lobby" }); }}
          className="space-y-4"
        >
          <Field label="Username" type="text" placeholder="Enter your username" defaultValue="TaroKing" />
          <Field label="Password" type="password" placeholder="••••••••" defaultValue="password" />

          <label className="flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 accent-[var(--gold)]"
              />
              Remember me
            </span>
            <button type="button" className="text-gold text-xs hover:underline">Forgot?</button>
          </label>

          <GoldButton type="submit" size="lg" className="w-full mt-2">
            Sign In
          </GoldButton>

          <div className="relative my-4 text-center">
            <div className="absolute inset-x-0 top-1/2 border-t border-[var(--gold)]/20" />
            <span className="relative bg-card px-3 text-xs text-muted-foreground uppercase tracking-wider">or</span>
          </div>

          <Link to="/register">
            <GoldButton type="button" variant="outline" size="lg" className="w-full">
              Create New Account
            </GoldButton>
          </Link>
        </form>

        <p className="mt-auto text-center text-xs text-muted-foreground pt-8">
          © 2026 TaroXGameHub
        </p>
      </div>
    </MobileShell>
  );
}

export function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block space-y-1.5">
      <span className="text-xs uppercase tracking-wider text-muted-foreground">{label}</span>
      <input
        {...rest}
        className="w-full px-4 py-3 rounded-xl bg-[var(--input)] border border-[var(--gold)]/20 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-[var(--gold)] focus:ring-2 focus:ring-[var(--gold)]/30 transition"
      />
    </label>
  );
}

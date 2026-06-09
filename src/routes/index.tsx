import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { MobileShell } from "@/components/MobileShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shan Koe Mee — TaroXGameHub" },
      { name: "description", content: "Premium multiplayer Shan Koe Mee card game. Play live with friends in a luxury casino lounge." },
      { property: "og:title", content: "Shan Koe Mee — TaroXGameHub" },
      { property: "og:description", content: "Premium multiplayer Shan Koe Mee card game." },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/login" }), 2400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <MobileShell>
      <div className="min-h-screen flex flex-col items-center justify-center px-8 text-center gap-8 relative">
        {/* logo */}
        <div className="relative">
          <div className="absolute inset-0 bg-gold-gradient rounded-full blur-3xl opacity-30 animate-pulse-gold" />
          <div className="relative w-40 h-40 rounded-full bg-gradient-to-br from-[var(--crimson)] to-[var(--crimson-dark)] border-4 border-[var(--gold)] shadow-gold flex items-center justify-center">
            <div className="absolute inset-2 rounded-full border border-[var(--gold)]/40" />
            <div className="font-display text-6xl text-gold-gradient">♛</div>
          </div>
        </div>

        <div className="space-y-2 animate-float-up">
          <h1 className="font-display text-4xl text-gold-gradient animate-glow">Shan Koe Mee</h1>
          <p className="text-sm text-muted-foreground tracking-[0.3em] uppercase">Royal Card Lounge</p>
        </div>

        {/* loader */}
        <div className="absolute bottom-20 flex flex-col items-center gap-4">
          <div className="w-10 h-10 rounded-full border-2 border-[var(--gold)]/20 border-t-[var(--gold)] animate-spin-slow" style={{ animationDuration: "1.2s" }} />
          <div className="text-xs text-muted-foreground">
            Powered by <span className="text-gold font-semibold">TaroXGameHub</span>
          </div>
        </div>
      </div>
    </MobileShell>
  );
}

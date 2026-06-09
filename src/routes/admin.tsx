import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { GoldButton } from "@/components/GoldButton";
import { CoinBadge } from "@/components/CoinBadge";
import { mockPlayers, mockRooms, onlineCount } from "@/lib/mock-data";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Shan Koe Mee" }] }),
  component: Admin,
});

function Admin() {
  return (
    <MobileShell>
      <TopBar title="Admin Dashboard" />

      <div className="px-4 py-5 space-y-5 pb-10">
        {/* stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <KPI label="Online players" value={onlineCount.toLocaleString()} sub="+12% today" />
          <KPI label="Active rooms" value={mockRooms.length} sub="2 playing" />
          <KPI label="Coins in play" value="3.2M" sub="across all tables" />
          <KPI label="Revenue (24h)" value="48,500" sub="house edge" />
        </div>

        {/* User management */}
        <Section title="User Management">
          {mockPlayers.slice(0, 4).map((p) => (
            <div key={p.id} className="flex items-center gap-3 py-2.5">
              <img src={p.avatar} className="w-10 h-10 rounded-full bg-card" alt="" />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold truncate">{p.name}</div>
                <div className="text-[11px] text-muted-foreground">ID · {p.id}</div>
              </div>
              <CoinBadge amount={p.coins} size="sm" />
              <button className="text-xs text-gold">⋯</button>
            </div>
          ))}
          <GoldButton variant="outline" size="sm" className="w-full mt-2">View all users</GoldButton>
        </Section>

        {/* Room management */}
        <Section title="Room Management">
          {mockRooms.slice(0, 3).map((r) => (
            <div key={r.id} className="flex items-center justify-between py-2.5">
              <div>
                <div className="text-sm font-semibold">{r.name}</div>
                <div className="text-[11px] text-muted-foreground">
                  {r.players}/{r.maxPlayers} · min {r.minBet}
                </div>
              </div>
              <button className="text-xs text-red-400 border border-red-400/40 rounded-full px-3 py-1">Close</button>
            </div>
          ))}
        </Section>

        {/* Coin management */}
        <Section title="Coin Management">
          <p className="text-xs text-muted-foreground mb-3">Issue, deduct or freeze user coin balances.</p>
          <div className="grid grid-cols-3 gap-2">
            <GoldButton size="sm" variant="outline">Issue</GoldButton>
            <GoldButton size="sm" variant="outline">Deduct</GoldButton>
            <GoldButton size="sm" variant="crimson">Freeze</GoldButton>
          </div>
        </Section>

        {/* Rules display */}
        <Section title="Game Rules">
          <ul className="text-xs text-muted-foreground space-y-1.5 list-disc pl-4">
            <li>Dealer starts each session with <span className="text-gold">1,000 coins</span>.</li>
            <li>Dealer rotates when bank reaches <span className="text-gold">10,000 coins</span>.</li>
            <li>Dealer rotates when bank reaches <span className="text-gold">0</span>.</li>
            <li>Maximum <span className="text-gold">5 players</span> per room.</li>
          </ul>
        </Section>
      </div>
    </MobileShell>
  );
}

function KPI({ label, value, sub }: { label: string; value: string | number; sub: string }) {
  return (
    <div className="rounded-xl bg-[var(--card)]/60 border border-[var(--gold)]/15 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="font-display text-xl text-gold-gradient mt-0.5">{value}</div>
      <div className="text-[10px] text-muted-foreground mt-1">{sub}</div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl bg-[var(--card)]/40 border border-[var(--gold)]/15 p-4">
      <h3 className="font-display text-base text-gold mb-2">{title}</h3>
      {children}
    </div>
  );
}

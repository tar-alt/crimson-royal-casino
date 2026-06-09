import { createFileRoute } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { GoldButton } from "@/components/GoldButton";
import { CoinBadge } from "@/components/CoinBadge";
import { mockMatches, mockUser } from "@/lib/mock-data";

export const Route = createFileRoute("/profile")({
  head: () => ({ meta: [{ title: "Profile — Shan Koe Mee" }] }),
  component: Profile,
});

function Profile() {
  const total = mockUser.wins + mockUser.losses;
  const winRate = Math.round((mockUser.wins / total) * 100);

  return (
    <MobileShell>
      <TopBar
        title="Profile"
        right={<button className="text-gold text-xs">Edit</button>}
      />

      {/* hero */}
      <div className="px-6 pt-6 pb-5 text-center border-b border-[var(--gold)]/10">
        <div className="mx-auto w-24 h-24 rounded-full p-[3px] bg-gold-gradient shadow-gold">
          <img src={mockUser.avatar} alt="" className="w-full h-full rounded-full bg-card" />
        </div>
        <h2 className="font-display text-2xl text-gold-gradient mt-3">{mockUser.username}</h2>
        <p className="text-xs text-muted-foreground">{mockUser.phone} · Joined {mockUser.joined}</p>
        <div className="mt-3 flex justify-center">
          <CoinBadge amount={mockUser.coins} size="lg" />
        </div>
      </div>

      {/* stats */}
      <div className="px-4 py-5 grid grid-cols-3 gap-3">
        <Stat label="Wins" value={mockUser.wins} accent="text-emerald-400" />
        <Stat label="Losses" value={mockUser.losses} accent="text-red-400" />
        <Stat label="Win rate" value={`${winRate}%`} accent="text-gold" />
      </div>

      {/* history */}
      <div className="px-4 pb-10">
        <h3 className="font-display text-lg text-gold mb-3">Match History</h3>
        <div className="space-y-2">
          {mockMatches.map((m) => {
            const win = m.result === "win";
            return (
              <div key={m.id} className="flex items-center justify-between rounded-xl px-4 py-3 bg-[var(--card)]/60 border border-[var(--gold)]/15">
                <div>
                  <div className="text-sm font-semibold">{m.room}</div>
                  <div className="text-[11px] text-muted-foreground">{m.date}</div>
                </div>
                <div className={`text-sm font-semibold ${win ? "text-emerald-400" : "text-red-400"}`}>
                  {win ? "+" : ""}{m.amount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>

        <GoldButton variant="outline" size="md" className="w-full mt-6">Edit Profile</GoldButton>
      </div>
    </MobileShell>
  );
}

function Stat({ label, value, accent }: { label: string; value: string | number; accent: string }) {
  return (
    <div className="rounded-xl bg-[var(--card)]/60 border border-[var(--gold)]/15 py-3 text-center">
      <div className={`text-xl font-display ${accent}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

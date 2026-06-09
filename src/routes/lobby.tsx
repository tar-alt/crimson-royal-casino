import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { CoinBadge } from "@/components/CoinBadge";
import { GoldButton } from "@/components/GoldButton";
import { mockAnnouncement, mockRooms, mockUser, onlineCount } from "@/lib/mock-data";

export const Route = createFileRoute("/lobby")({
  head: () => ({ meta: [{ title: "Lobby — Shan Koe Mee" }] }),
  component: Lobby,
});

function Lobby() {
  return (
    <MobileShell>
      {/* header */}
      <div className="px-4 pt-6 pb-4 flex items-center justify-between">
        <Link to="/profile" className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full p-[2px] bg-gold-gradient">
            <img src={mockUser.avatar} className="w-full h-full rounded-full bg-card" alt="" />
          </div>
          <div>
            <div className="text-xs text-muted-foreground">Welcome back</div>
            <div className="font-display text-base text-gold">{mockUser.username}</div>
          </div>
        </Link>
        <div className="flex flex-col items-end gap-1">
          <CoinBadge amount={mockUser.coins} />
          <span className="text-[10px] text-muted-foreground flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            {onlineCount.toLocaleString()} online
          </span>
        </div>
      </div>

      {/* announcement */}
      <div className="mx-4 mb-5 rounded-xl bg-crimson-gradient border border-[var(--gold)]/40 px-4 py-3 overflow-hidden relative">
        <div className="absolute inset-0 animate-shimmer pointer-events-none" />
        <p className="relative text-sm text-white">{mockAnnouncement}</p>
      </div>

      {/* CTAs */}
      <div className="px-4 grid grid-cols-2 gap-3 mb-6">
        <GoldButton size="md" className="w-full">+ Create Room</GoldButton>
        <GoldButton size="md" variant="outline" className="w-full">Join by ID</GoldButton>
      </div>

      {/* rules pill */}
      <div className="mx-4 mb-4 px-4 py-3 rounded-xl bg-[var(--card)]/60 border border-[var(--gold)]/15 text-xs text-muted-foreground">
        <span className="text-gold font-semibold">House Rules · </span>
        Dealer starts with 1,000 coins · rotates at 10,000 or when bankrupt · max 5 players per room.
      </div>

      {/* room list */}
      <div className="px-4 pb-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="font-display text-lg text-gold">Active Rooms</h2>
          <span className="text-xs text-muted-foreground">{mockRooms.length} tables</span>
        </div>
        <div className="space-y-2.5">
          {mockRooms.map((r) => {
            const full = r.status === "full";
            return (
              <Link
                key={r.id}
                to="/room/$id"
                params={{ id: r.id }}
                className={`block rounded-xl px-4 py-3 border transition ${full ? "border-[var(--border)] opacity-60 pointer-events-none" : "border-[var(--gold)]/25 bg-[var(--card)]/60 hover:border-[var(--gold)]/60 hover:bg-[var(--card)]"}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-display text-base text-foreground">{r.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      Min bet · <span className="text-gold">{r.minBet.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <StatusPill status={r.status} />
                    <div className="text-xs text-muted-foreground mt-1">
                      {r.players}/{r.maxPlayers} seats
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </MobileShell>
  );
}

function StatusPill({ status }: { status: "waiting" | "playing" | "full" }) {
  const map = {
    waiting: { label: "Waiting", cls: "bg-emerald-500/15 text-emerald-300 border-emerald-400/30" },
    playing: { label: "Playing", cls: "bg-amber-500/15 text-amber-300 border-amber-400/30" },
    full: { label: "Full", cls: "bg-red-500/15 text-red-300 border-red-400/30" },
  };
  const s = map[status];
  return <span className={`inline-block text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${s.cls}`}>{s.label}</span>;
}

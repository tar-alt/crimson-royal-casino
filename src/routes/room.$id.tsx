import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { GoldButton } from "@/components/GoldButton";
import { CoinBadge } from "@/components/CoinBadge";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { mockPlayers, mockRooms } from "@/lib/mock-data";

export const Route = createFileRoute("/room/$id")({
  head: () => ({ meta: [{ title: "Room — Shan Koe Mee" }] }),
  component: RoomScreen,
});

// fixed 5 seat coordinates around the oval table
const SEATS = [
  { top: "5%", left: "50%", transform: "-translate-x-1/2" },        // top
  { top: "35%", left: "5%", transform: "" },                          // left
  { top: "35%", right: "5%", transform: "" },                         // right
  { bottom: "18%", left: "18%", transform: "" },                      // bottom-left
  { bottom: "18%", right: "18%", transform: "" },                     // bottom-right
];

function RoomScreen() {
  const { id } = Route.useParams();
  const room = mockRooms.find((r) => r.id === id) ?? mockRooms[0];
  const dealer = mockPlayers.find((p) => p.isDealer)!;

  return (
    <MobileShell>
      <TopBar
        title={room.name}
        right={<button className="w-10 h-10 flex items-center justify-center text-gold rounded-full hover:bg-[var(--gold)]/10">💬</button>}
      />

      {/* meta */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-[var(--gold)]/10">
        <div className="text-xs">
          <div className="text-muted-foreground">Min bet</div>
          <div className="text-gold font-semibold">{room.minBet.toLocaleString()}</div>
        </div>
        <div className="text-xs text-center">
          <div className="text-muted-foreground">Dealer</div>
          <div className="text-gold font-semibold">{dealer.name}</div>
        </div>
        <div className="text-xs text-right">
          <div className="text-muted-foreground">Dealer bank</div>
          <CoinBadge amount={dealer.coins} size="sm" />
        </div>
      </div>

      {/* table */}
      <div className="relative mx-4 mt-6 aspect-[3/4] rounded-[50%] bg-felt border-[6px] border-[var(--gold)]/70 shadow-deep">
        <div className="absolute inset-3 rounded-[50%] border border-[var(--gold)]/30" />

        {/* center */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center gap-2">
          <div className="text-xs uppercase tracking-[0.3em] text-[var(--gold)]/70">Current Bet</div>
          <CoinBadge amount={500} size="lg" />
          <div className="text-[10px] text-white/60 mt-1">Waiting for players...</div>
        </div>

        {/* seats */}
        {mockPlayers.slice(0, 5).map((p, i) => (
          <div
            key={p.id}
            className="absolute"
            style={{ top: SEATS[i].top, bottom: SEATS[i].bottom, left: SEATS[i].left, right: SEATS[i].right, transform: SEATS[i].transform }}
          >
            <PlayerAvatar player={p} size="md" active={p.isYou} />
          </div>
        ))}
      </div>

      {/* actions */}
      <div className="px-4 mt-6 pb-8 grid grid-cols-2 gap-3">
        <Link to="/lobby">
          <GoldButton variant="outline" size="md" className="w-full">Leave</GoldButton>
        </Link>
        <Link to="/game/$id" params={{ id }}>
          <GoldButton size="md" className="w-full">I'm Ready</GoldButton>
        </Link>
      </div>
    </MobileShell>
  );
}

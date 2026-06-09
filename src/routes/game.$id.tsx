import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MobileShell } from "@/components/MobileShell";
import { TopBar } from "@/components/TopBar";
import { GoldButton } from "@/components/GoldButton";
import { CoinBadge } from "@/components/CoinBadge";
import { PlayerAvatar } from "@/components/PlayerAvatar";
import { PlayingCard } from "@/components/PlayingCard";
import { mockPlayers } from "@/lib/mock-data";

export const Route = createFileRoute("/game/$id")({
  head: () => ({ meta: [{ title: "Game — Shan Koe Mee" }] }),
  component: GameScreen,
});

const SEATS = [
  { top: "4%", left: "50%", transform: "-translate-x-1/2" },
  { top: "30%", left: "3%", transform: "" },
  { top: "30%", right: "3%", transform: "" },
  { bottom: "30%", left: "10%", transform: "" },
  { bottom: "30%", right: "10%", transform: "" },
];

function GameScreen() {
  const [time, setTime] = useState(15);
  const [showResult, setShowResult] = useState(false);
  const navigate = useNavigate();
  const you = mockPlayers.find((p) => p.isYou)!;

  useEffect(() => {
    if (time <= 0) return;
    const t = setTimeout(() => setTime((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [time]);

  return (
    <MobileShell>
      <TopBar
        title="Round #248"
        right={<div className="text-[10px] font-mono text-gold border border-[var(--gold)]/40 px-2 py-1 rounded-full">{String(time).padStart(2, "0")}s</div>}
      />

      {/* meta */}
      <div className="px-4 py-2.5 flex items-center justify-between border-b border-[var(--gold)]/10">
        <div className="text-xs text-muted-foreground">
          Pot · <span className="text-gold font-semibold">2,500</span>
        </div>
        <CoinBadge amount={you.coins} size="sm" />
      </div>

      {/* table */}
      <div className="relative mx-3 mt-4 aspect-[3/4] rounded-[50%] bg-felt border-[6px] border-[var(--gold)]/70 shadow-deep">
        <div className="absolute inset-3 rounded-[50%] border border-[var(--gold)]/30" />

        {/* center pot + dealer pile */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="text-[10px] uppercase tracking-[0.3em] text-[var(--gold)]/70">Pot</div>
          <CoinBadge amount={2500} size="lg" />
          <div className="flex -space-x-3 mt-2">
            <PlayingCard hidden size="sm" delay={0} />
            <PlayingCard hidden size="sm" delay={120} />
            <PlayingCard hidden size="sm" delay={240} />
          </div>
        </div>

        {/* seats with cards */}
        {mockPlayers.slice(0, 5).map((p, i) => (
          <div
            key={p.id}
            className="absolute flex flex-col items-center gap-1.5"
            style={{ top: SEATS[i].top, bottom: SEATS[i].bottom, left: SEATS[i].left, right: SEATS[i].right, transform: SEATS[i].transform }}
          >
            <PlayerAvatar player={p} size="sm" active={p.isYou} />
            <div className="flex gap-1">
              {p.cards?.map((c, ci) => (
                <PlayingCard
                  key={ci}
                  card={c}
                  hidden={!p.isYou}
                  size="sm"
                  delay={i * 150 + ci * 80}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* your hand large */}
      <div className="mt-5 flex justify-center gap-3">
        {you.cards?.map((c, i) => (
          <PlayingCard key={i} card={c} size="lg" delay={600 + i * 120} />
        ))}
      </div>

      {/* actions */}
      <div className="px-4 mt-5 pb-8 grid grid-cols-2 gap-3">
        <GoldButton variant="outline" size="md" onClick={() => setShowResult(true)} className="w-full">Stand</GoldButton>
        <GoldButton size="md" onClick={() => setShowResult(true)} className="w-full">Draw</GoldButton>
      </div>

      {/* result modal */}
      {showResult && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-6 animate-float-up">
          <div className="w-full max-w-xs rounded-2xl bg-luxe border-2 border-[var(--gold)] shadow-gold p-6 text-center space-y-4">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Round Result</div>
            <h2 className="font-display text-3xl text-gold-gradient animate-glow">You Win!</h2>
            <div className="text-sm text-muted-foreground">Hand: King + Nine · <span className="text-gold">Shan 9</span></div>
            <div className="py-3">
              <CoinBadge amount={2500} size="lg" />
              <div className="text-xs text-emerald-400 mt-1">+2,500 coins added</div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <GoldButton variant="outline" size="sm" onClick={() => navigate({ to: "/lobby" })}>Leave</GoldButton>
              <GoldButton size="sm" onClick={() => { setShowResult(false); setTime(15); }}>Next Round</GoldButton>
            </div>
          </div>
        </div>
      )}
    </MobileShell>
  );
}
